"""Validate that public-facing metadata matches pack/pack.json.

The README and the CurseForge page source hardcode the platform/status line so it reads
well for players. This check keeps that claim honest: the lines must match the values in
pack/pack.json (the release source of truth), so a version, loader, or release-channel
change cannot silently drift the public presentation.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

STATUS_LABELS = {"alpha": "Alpha", "beta": "Beta", "release": "Release"}


def main() -> int:
    pack = json.loads((ROOT / "pack" / "pack.json").read_text(encoding="utf-8"))

    release_type = str(pack.get("releaseType", "")).lower()
    if release_type not in STATUS_LABELS:
        print(f"ERROR: pack.json has invalid releaseType: {release_type!r}")
        return 1

    status = STATUS_LABELS[release_type]
    minecraft = pack["minecraftVersion"]
    neoforge = pack["neoForgeVersion"]
    java = pack["javaVersion"]

    expected = {
        "README.md": f"Minecraft {minecraft} · NeoForge {neoforge} · Java {java} · {status}",
        "docs/CURSEFORGE.md": f"Minecraft {minecraft} · NeoForge · Java {java} · {status}",
    }

    failures: list[str] = []
    for file, line in expected.items():
        text = (ROOT / file).read_text(encoding="utf-8")
        if line not in text:
            failures.append(f"{file}: missing or stale platform line:\n  expected: {line}")

    if failures:
        for failure in failures:
            print(f"ERROR: {failure}")
        print("Update the file (or pack/pack.json) so both agree.")
        return 1

    print(f"Metadata OK: Minecraft {minecraft} · NeoForge {neoforge} · Java {java} · {status}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
