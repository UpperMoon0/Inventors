// Metal progression is built around Productive Metalworks. Ores, raw metals,
// crushed ores and dusts must be melted and cast instead of becoming ingots in
// a furnace or blast furnace. Non-metal furnace recipes are unaffected.

ServerEvents.recipes(event => {
    const progressionIngots = [
        'minecraft:copper_ingot',
        'minecraft:iron_ingot',
        'minecraft:gold_ingot',
        'create:zinc_ingot',
        'create:brass_ingot',
        'ftbmaterials:aluminum_ingot',
        'ftbmaterials:bronze_ingot',
        'ftbmaterials:invar_ingot',
        'ftbmaterials:lead_ingot',
        'ftbmaterials:nickel_ingot',
        'ftbmaterials:silver_ingot',
        'ftbmaterials:steel_ingot',
        'ftbmaterials:tin_ingot',
        'ftbmaterials:titanium_ingot',
        'ftbmaterials:uranium_ingot',
        'ftbmaterials:zinc_ingot'
    ]

    progressionIngots.forEach(ingot => {
        event.remove({ type: 'minecraft:smelting', output: ingot })
        event.remove({ type: 'minecraft:blasting', output: ingot })
    })
})
