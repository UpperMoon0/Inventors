# Contributing

Thanks for helping with Inventors! This repository is the development workspace for the pack: configs, KubeJS scripts, quest files, and the packaging tooling all live here.

## Ways to contribute

- **Report bugs** using the issue templates: [crash](../../issues/new?template=crash.yml), [progression/recipe bug](../../issues/new?template=progression-bug.yml), or [mod conflict](../../issues/new?template=mod-conflict.yml).
- **Quest and balance feedback** is especially welcome while the pack is in beta.
- **Pull requests** for quest fixes, recipe unification, config tuning, and documentation are accepted.

## Ground rules

- The release source of truth is `pack/pack.json`. Never bump `version` in a PR unless the change is meant to ship as a new release — version bumps to `main` trigger a public CurseForge/GitHub release (see `docs/releasing.md`).
- Keep quest IDs stable: `scripts/validate_quests.py` validates FTB Quest IDs and dependencies and runs in CI.
- KubeJS scripts under `kubejs/server_scripts/` must keep the unified material progression consistent — if you add a recipe, check the tags in `kubejs/server_scripts/tags.js`.
- Client-only mods and configs belong in `pack.json` (`clientOnlyProjectIds` / `serverExcludedPaths`), not in ad-hoc server filters.
- Changelogs for releases go to `changelog/<version>.md`; the release workflow fails without one.

## Local validation

```powershell
python scripts/validate_quests.py   # quest ID/dependency check
./scripts/build_modpack.ps1         # full client + server archive build
./scripts/publish_curseforge.ps1 -DryRun   # preview upload metadata, uploads nothing
```

## License

By contributing you agree your contributions are licensed under the repository license (CC BY-NC-SA 4.0, see `LICENSE`).
