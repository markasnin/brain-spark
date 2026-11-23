"""Prepare existing family links for the two-parent rules.

Run with a project administrator's gcloud session. Defaults to a read-only
preview. Publish the new rules before applying, then deploy the web update.
"""

import argparse
import json
import subprocess
from collections import defaultdict
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--project", required=True)
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()
    token = subprocess.check_output(
        ["gcloud", "auth", "print-access-token"], text=True, shell=False
    ).strip()
    root = f"https://firestore.googleapis.com/v1/projects/{args.project}/databases/(default)/documents"

    def request(path, body=None):
        headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
        data = None if body is None else json.dumps(body).encode()
        with urlopen(Request(root + path, data=data, headers=headers), timeout=30) as response:
            return json.load(response)

    def documents(collection):
        params = {"pageSize": 300}
        while True:
            page = request(f"/{collection}?{urlencode(params)}")
            yield from page.get("documents", [])
            next_page = page.get("nextPageToken")
            if not next_page:
                break
            params["pageToken"] = next_page

    initialized = {row["name"].rsplit("/", 1)[1] for row in documents("familyParentSlots")}
    children = {
        row["name"].rsplit("/", 1)[1]
        for row in documents("familyProfiles")
        if row.get("fields", {}).get("role", {}).get("stringValue") == "child"
    }
    existing = defaultdict(list)
    for row in documents("familyLinks"):
        fields = row["fields"]
        child = fields["child"]["stringValue"]
        parent = fields["parent"]["stringValue"]
        accepted = fields["accepted"]["booleanValue"]
        existing[child].append((not accepted, row["createTime"], parent))

    conflicts = [child for child, links in existing.items() if len(links) > 2 or child not in children]
    if conflicts:
        print(f"{len(conflicts)} legacy families require review. Migration did not write any records.")
        for child in sorted(conflicts):
            print(f"Review familyLinks where child equals {child}")
        return 1

    pending = sorted(children - initialized)
    print(f"{len(pending)} child accounts to migrate. {len(initialized)} already initialized.")
    if not args.apply:
        return 0

    for child in pending:
        links = sorted(existing[child])
        first, second = ([link[2] for link in links] + ["", ""])[:2]
        fields = {
            "first": {"stringValue": first},
            "second": {"stringValue": second},
            "approved": {"booleanValue": len(links) == 2 and not links[1][0]},
        }
        try:
            request("/familyParentSlots?" + urlencode({"documentId": child}), {"fields": fields})
        except HTTPError as error:
            if error.code != 409:
                raise
    print("Parent limits initialized. Existing links and assignments were preserved.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
