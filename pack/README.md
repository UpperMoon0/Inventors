# Inventors packaging

`pack.json` is the release source of truth. The CurseForge dependency list is generated from the tracked `minecraftinstance.json`; in-house jars are embedded from tracked files under `mods/`.

Build both distributions from the repository root:

```powershell
./scripts/build_modpack.ps1
```

Outputs:

- `dist/Inventors-<version>.zip` — CurseForge client import with `manifest.json`, `modlist.html`, and `overrides/`.
- `dist/Inventors-<version>-server.zip` — dedicated server files with client-only mods, scripts, assets, and configs removed.

The server exclusion lists are deliberately explicit and live in `pack.json`. Add a project ID to `clientOnlyProjectIds` when a new mod cannot or should not load on a dedicated server. Add path globs to `serverExcludedPaths` for client-only configuration or resources.

## Publishing

`publish_curseforge.ps1` uploads the client archive to project `1480135`, then uploads the server archive as its additional child file. Uploads use `CURSEFORGE_API_TOKEN`. If CurseForge reports a duplicate, deterministic recovery queries the Core API by file name and SHA-1 (plus the client parent id for the server pack), which additionally requires `CURSEFORGE_API_KEY`. The two credentials are not interchangeable.

```powershell
$env:CURSEFORGE_API_TOKEN = "..."
$env:CURSEFORGE_API_KEY = "..." # required for safe duplicate/retry recovery
./scripts/publish_curseforge.ps1 -ReleaseType beta
```

GitHub Actions provides both repository secrets. A first-time upload normally only consumes `CURSEFORGE_API_TOKEN`; `CURSEFORGE_API_KEY` is used lazily if duplicate recovery is needed. See `docs/releasing.md` for the full pipeline description; the short version:

- **Push to `main` touching `pack/pack.json`** always builds and verifies both archives, but only **publishes** to GitHub Releases and CurseForge when the `version` field in `pack/pack.json` actually changed. Editing any other part of `pack.json` (e.g. `serverExcludedPaths`) results in a build-only run.
- **Pushing a `v*` tag** matching `v<version>` publishes. An existing tag pointing at a different commit fails the run instead of silently republishing.
- **Manual `workflow_dispatch`** builds and verifies by default; it publishes only when run from `main` with the `publish` input set to `true`. The `version` input is for build-only testing; publishing rejects a version that differs from `pack/pack.json`.
- The release workflow fails if `changelog/<version>.md` is missing for the version being published.
- The tag is pushed with the repository `GITHUB_TOKEN`, so its push event does not re-trigger the workflow.
