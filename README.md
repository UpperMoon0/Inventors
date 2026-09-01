# Inventors

**Inventors** is a progression-focused Minecraft 1.21.1 NeoForge modpack about engineering your way from primitive manual processing to mechanical and automated industry.

`Minecraft 1.21.1 · NeoForge 21.1.247 · Java 21 · Beta`

> **Beta status:** the pack is actively developed and quest content is still being balanced. Updates may change recipes and progression. Back up your worlds before updating.

## What makes it different

Inventors is not another "Create from day one" pack. Progression is deliberately staged so that automation has to be earned:

1. **Firstworks** reworks early survival — primitive tools, animal materials, and manual processing come before any machine.
2. **The Quern** is your first real workstation: flour, dough, and manual grinding anchor the early chapters.
3. **Animal power** via **Horse Power CE** turns livestock into your first mechanical power source.
4. **Create** (plus Slice & Dice, Enchantment Industry, Power Grid, Fluid Logistics, and more) unlocks proper rotational automation once you've earned it.
5. **FTB Quests** guides the whole path, and **KubeJS** unifies recipes and materials so every stage feeds into the next.

Beyond the core loop you'll find Silent Gear tooling, Farmer's Delight cooking, Sophisticated Storage, seasons and worldgen overhauls (Terralith, Tectonic, Regions Unexplored), and more.

## Installation

Install through **CurseForge**: [Inventors on CurseForge](https://www.curseforge.com/minecraft/modpacks/inventors) — use the CurseForge App and install the latest 1.21.1 beta file. Do **not** clone this repository to play; it is the development workspace the pack is built from.

## Dedicated servers

Every client release ships a matching server pack as an additional CurseForge file. Download `Inventors <version> Server Pack`, extract it, and run:

- Windows: `start-server.bat`
- Linux/macOS: `./start-server.sh`

Server-specific configs (view distance, JVM args, etc.) are pre-tuned and documented in `pack/server/SERVER-README.md`.

## Updating existing worlds

Versions are in beta and recipes/quests change between releases. Keep a world backup before updating; quest progress is stored per world in `config/ftbquests/quests`.

## Reporting problems

Open a GitHub issue using the matching template:

- [Crash report](../../issues/new?template=crash.yml)
- [Progression or recipe bug](../../issues/new?template=progression-bug.yml)
- [Mod conflict](../../issues/new?template=mod-conflict.yml)

Include your `debug.log`/`crash-reports` file and the Inventors version you are playing.

## For contributors and maintainers

- Pack identity, versions, and server exclusions live in `pack/pack.json` (the release source of truth).
- Building and packaging: see `pack/README.md`.
- Release/publishing pipeline: see `docs/releasing.md`.
- Quest data is validated by `scripts/validate_quests.py` in CI.
- Changelog index: see [CHANGELOG.md](CHANGELOG.md).

## Credits

Inventors is maintained by NsTut (UpperMoon0), who also develops the defining mods in the pack: Firstworks, Simply Screens, OpenUI MC, and NsTut Economy. The pack stands on the shoulders of Create and its addon ecosystem, Horse Power CE, Farmer's Delight and its addons, Silent Gear, the FTB suite, KubeJS, and many others — all third-party mods remain the property of their respective authors under their own licenses.

## License

Repository-original content — KubeJS scripts, quest files, pack configs, documentation, and build tooling — is licensed under [CC BY-NC-SA 4.0](LICENSE). Bundled third-party mods keep their own licenses and redistribution terms.
