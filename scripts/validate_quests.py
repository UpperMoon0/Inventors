import os
import glob
import re

quest_dir = os.path.join(os.path.dirname(__file__), "../config/ftbquests/quests")
ids = {}
dependencies_to_check = []
errors = []

for path in glob.glob(os.path.join(quest_dir, "**/*.snbt"), recursive=True):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    # FTB Quests quest/task/chapter IDs are 16-character hex strings
    found = re.findall(r'id:\s*"([0-9A-Fa-f]{16})"', content)
    for i in found:
        canonical = i.lower()
        if canonical in ids:
            errors.append(f"Duplicate FTB Quest/Task ID {i} in {path} (first seen in {ids[canonical]})")
        else:
            ids[canonical] = path

    # Find dependencies
    # Matches individual dependency hex strings inside dependencies arrays
    dep_blocks = re.findall(r'dependencies:\s*\[([^\]]*)\]', content, re.DOTALL)
    for block in dep_blocks:
        deps = re.findall(r'"([0-9A-Fa-f]{16})"', block)
        for dep in deps:
            dependencies_to_check.append((dep, path))

for dep, path in dependencies_to_check:
    if dep.lower() not in ids:
        errors.append(f"Dangling dependency ID {dep} in {path} does not exist in any quest file!")

if errors:
    for e in errors:
        print("ERROR:", e)
    raise SystemExit(1)
else:
    print(f"SUCCESS: Verified {len(ids)} unique FTB Quest/Task IDs and {len(dependencies_to_check)} valid dependency references across all SNBT chapters and reward tables.")

