# Release runbook

`pack/pack.json` is the release source of truth. Everything below is automated by `.github/workflows/release.yml`.

## Release triggers

The workflow has three triggers, but publishing is decided by the `release-gate` job:

| Trigger | Build | Publishes |
| --- | --- | --- |
| Push to `main` touching `pack/pack.json` | Always | Only when `version` changed versus the previous commit |
| Push of a `v*` tag | Yes | Only when the tag equals `v<version>` and it was not pushed by the workflow itself |
| `workflow_dispatch` from `main` | Always | Only with the `publish` input set to `true` |

Any other push to `main` (docs, configs, scripts) does not trigger the release workflow at all. The gate also refuses to publish if `changelog/<version>.md` is missing.

Notes:

- Pushing a version-bumped `pack/pack.json` to `main` is the normal release path. The workflow builds both archives, creates the `v<version>` tag if missing, publishes a GitHub Release with the changelog body, and uploads the client archive to CurseForge with the server archive attached as its child file.
- The workflow-created tag re-triggers the workflow once; the gate detects `github-actions[bot]` as the tag pusher and skips publishing again.
- Manual dispatch defaults to `publish: false` (build-only verification). Use it with `publish: true` to re-publish or release an explicit version override.

## Cutting a release

1. Update `version` (and `releaseType` if the channel changes) in `pack/pack.json`.
2. Add `changelog/<version>.md` describing the release — the gate fails without it.
3. Merge to `main`. The release workflow publishes automatically.
4. Verify the run on GitHub Actions, then check the CurseForge project page and the GitHub Release.

## Secrets

- `CURSEFORGE_API_TOKEN` — CurseForge API token, used by `publish_curseforge.ps1` only. Never logged or written to disk.

## Local dry run

```powershell
./scripts/publish_curseforge.ps1 -DryRun
```

Builds nothing, contacts nothing; prints the metadata that would be uploaded.

## Version metadata naming

The client file is published as `Inventors <version>` with game-version tags `Client`, the Minecraft version, and `NeoForge`; the server archive is attached as `Inventors <version> Server Pack`. All of it is derived centrally from `pack/pack.json` in `publish_curseforge.ps1`.
