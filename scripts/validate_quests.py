import os
import glob
import re

quest_dir = os.path.join(os.path.dirname(__file__), "../config/ftbquests/quests")
ids = {}
errors = []

for path in glob.glob(os.path.join(quest_dir, "**/*.snbt"), recursive=True):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    # FTB Quests quest/task/chapter IDs are 16-character hex strings
    found = re.findall(r'id:\s*"([0-9A-Fa-f]{16})"', content)
    for i in found:
        # Canonical lowercase comparison
        canonical = i.lower()
        if canonical in ids:
            errors.append(f"Duplicate FTB Quest/Task ID {i} in {path} (first seen in {ids[canonical]})")
        else:
            ids[canonical] = path

if errors:
    for e in errors:
        print("ERROR:", e)
    raise SystemExit(1)
else:
    print(f"SUCCESS: Verified {len(ids)} unique FTB Quest/Task IDs across all SNBT chapters and reward tables.")
