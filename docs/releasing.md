# Release runbook

`pack/pack.json` is the release source of truth. Everything below is automated by `.github/workflows/release.yml`.

## Release triggers

The workflow has three triggers, but publishing is decided by the `release-gate` job:

| Trigger | Build | Publishes |
| --- | --- | --- |
| Push to `main` touching `pack/pack.json` | Always | Only when `version` changed versus the previous commit |
| Push of a `v*` tag | Yes | Only when the tag equals `v<version>`; the publish job also requires an existing tag to point at the exact commit being released |
| `workflow_dispatch` from `main` | Always | Only with the `publish` input set to `true`; the `version` input is build-only and must equal `pack/pack.json` when publishing |

Any other push to `main` (docs, configs, scripts) does not trigger the release workflow at all. The gate also refuses to publish if `changelog/<version>.md` is missing.

Notes:

- Pushing a version-bumped `pack/pack.json` to `main` is the normal release path. The workflow builds both archives, creates the `v<version>` tag if missing, publishes a GitHub Release with the changelog body, and uploads the client archive to CurseForge with the server archive attached as its child file.
- The tag is pushed with the repository `GITHUB_TOKEN`; GitHub suppresses workflow triggers from `GITHUB_TOKEN` push events, so creating the tag never re-runs the release workflow.
- An existing `v<version>` tag pointing at a different commit fails the publish (e.g. after an accidental version downgrade) instead of silently republishing over an old release. Re-releases are made by bumping the version, or by manual dispatch on the exact commit that already carries the tag.
- Manual dispatch defaults to `publish: false` (build-only verification); the `version` input may differ from `pack/pack.json` for build testing, but publishing is rejected when it does.

## Cutting a release

1. Update `version` (and `releaseType` if the channel changes) in `pack/pack.json`.
2. Add `changelog/<version>.md` describing the release — the gate fails without it.
3. Merge to `main`. The release workflow publishes automatically.
4. Verify the run on GitHub Actions, then check the CurseForge project page and the GitHub Release.
5. Paste the description from `docs/CURSEFORGE.md` into the CurseForge project editor if it drifted (merging this repo does not update the CurseForge page — it is a manual paste step) and update the CF project license field to match `LICENSE`/`LICENSE-CODE`.

## Secrets

- `CURSEFORGE_API_TOKEN` — CurseForge API token, used by `publish_curseforge.ps1` only. Never logged or written to disk.

## Local dry run

```powershell
./scripts/publish_curseforge.ps1 -DryRun
```

Prints the exact upload metadata (display name, game-version tags, changelog) that would be sent to CurseForge. Builds nothing and contacts nothing — the release archives do not even need to exist.

## Version metadata naming

The client file is published as `Inventors <version>` with game-version tags `Client`, the Minecraft version, and `NeoForge`; the server archive is attached as `Inventors <version> Server Pack`. All of it is derived centrally from `pack/pack.json` in `publish_curseforge.ps1`.
