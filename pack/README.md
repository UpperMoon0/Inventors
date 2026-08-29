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

`publish_curseforge.ps1` uploads the client archive to project `1480135`, then uploads the server archive as its additional child file. It reads the token only from `CURSEFORGE_API_TOKEN`.

```powershell
$env:CURSEFORGE_API_TOKEN = "..."
./scripts/publish_curseforge.ps1 -ReleaseType beta
```

GitHub Actions uses the repository secret with the same name. Pull requests build and verify both archives without publishing; the workflow's manual `publish` input performs the release.
