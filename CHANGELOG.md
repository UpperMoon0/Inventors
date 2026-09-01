# Changelog

Release notes for published Inventors versions. The release pipeline uses `changelog/<version>.md` as the GitHub Release body — every entry below has a matching file in [`changelog/`](changelog/).

Pack identity (versions, loader, status) comes from [`pack/pack.json`](pack/pack.json).

## Releases

| Version | Date | Notes |
| --- | --- | --- |
| [0.3.3](changelog/0.3.3.md) | 2026-09-02 | Complete Stone/Copper progression, primitive Firstworks metallurgy, Productive Metalworks moved to Bronze |
| [0.3.2](changelog/0.3.2.md) | 2026-09-01 | Quern progression, Firstworks 0.0.12, automated packaging and CurseForge publishing |
| [Quern progression (dated log)](changelog/2026-08-29-quern-progression.md) | 2026-08-29 | Quest alignment for the unified Early Copper Age Quern |

Releases are published automatically when `pack/pack.json` version changes on `main` (or via `v*` tags / manual dispatch) — see [docs/releasing.md](docs/releasing.md).
