// Disable crusty_chunks ore generation

onEvent('worldgen.remove', event => {
    event.removeOres(ores => {
        ores.blocks = [
            'crusty_chunks:lead_ore',
            'crusty_chunks:deepslate_lead_ore',
            'crusty_chunks:nickel_ore',
            'crusty_chunks:deepslate_nickel_ore',
            'crusty_chunks:zinc_ore',
            'crusty_chunks:deepslate_zinc_ore',
            'crusty_chunks:uranium_ore',
            'crusty_chunks:deepslate_uranium_ore'
        ]
    })
})

// Add ftbmaterials tin ore generation to overworld
onEvent('worldgen.add', event => {
    event.addOre(ore => {
        ore.id = 'kubejs:tin_ore'
        ore.biomes = '#minecraft:is_overworld'
        ore.addTarget('minecraft:stone', 'ftbmaterials:tin_stone_ore')
        ore.addTarget('minecraft:deepslate', 'ftbmaterials:tin_deepslate_ore')
        ore.size(9)
        ore.count(20)
        ore.squaredRange(-64, 64)
        ore.triangleHeight(0, 64)
        ore.noop()
    })
})

// Add ftbmaterials nether ore generation
onEvent('worldgen.add', event => {
    // Silver ore in Nether
    event.addOre(ore => {
        ore.id = 'kubejs:silver_nether_ore'
        ore.biomes = '#minecraft:is_nether'
        ore.addTarget('minecraft:netherrack', 'ftbmaterials:silver_nether_ore')
        ore.size(9)
        ore.count(15)
        ore.squaredRange(0, 128)
        ore.uniformHeight(0, 128)
        ore.noop()
    })

    // Lead ore in Nether
    event.addOre(ore => {
        ore.id = 'kubejs:lead_nether_ore'
        ore.biomes = '#minecraft:is_nether'
        ore.addTarget('minecraft:netherrack', 'ftbmaterials:lead_nether_ore')
        ore.size(9)
        ore.count(15)
        ore.squaredRange(0, 128)
        ore.uniformHeight(0, 128)
        ore.noop()
    })

    // Nickel ore in Nether
    event.addOre(ore => {
        ore.id = 'kubejs:nickel_nether_ore'
        ore.biomes = '#minecraft:is_nether'
        ore.addTarget('minecraft:netherrack', 'ftbmaterials:nickel_nether_ore')
        ore.size(9)
        ore.count(15)
        ore.squaredRange(0, 128)
        ore.uniformHeight(0, 128)
        ore.noop()
    })

    // Uranium ore in Nether
    event.addOre(ore => {
        ore.id = 'kubejs:uranium_nether_ore'
        ore.biomes = '#minecraft:is_nether'
        ore.addTarget('minecraft:netherrack', 'ftbmaterials:uranium_nether_ore')
        ore.size(7)
        ore.count(10)
        ore.squaredRange(0, 128)
        ore.uniformHeight(0, 128)
        ore.noop()
    })
})
