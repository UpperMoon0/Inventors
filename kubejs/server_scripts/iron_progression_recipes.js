// Ore must first be reduced and forged into a wrought billet. Only that processed
// billet may be remelted; raw iron and ordinary iron products cannot bypass the gate.
// Explicit IDs avoid removing Create: Ironworks recipes for unrelated metals.

ServerEvents.recipes(event => {
    const ironMeltingRecipes = [
        'productivemetalworks:melting/create/crushed_raw_iron',
        'productivemetalworks:melting/dusts/iron',
        'productivemetalworks:melting/gears/iron',
        'productivemetalworks:melting/geore/iron_block',
        'productivemetalworks:melting/geore/iron_shard',
        'productivemetalworks:melting/ingots/iron',
        'productivemetalworks:melting/iron_bars',
        'productivemetalworks:melting/iron_door',
        'productivemetalworks:melting/iron_horse_armor',
        'productivemetalworks:melting/iron_trapdoor',
        'productivemetalworks:melting/nuggets/iron',
        'productivemetalworks:melting/ores/iron',
        'productivemetalworks:melting/plates/iron',
        'productivemetalworks:melting/raw_materials/iron',
        'productivemetalworks:melting/rods/iron',
        'productivemetalworks:melting/storage_blocks/iron',
        'productivemetalworks:melting/storage_blocks/raw_iron'
    ]

    const ironCastingRecipes = [
        'productivemetalworks:casting/create/iron_sheet',
        'productivemetalworks:casting/gears/alltheores/iron',
        'productivemetalworks:casting/gears/ftbmaterials/iron',
        'productivemetalworks:casting/ingots/iron',
        'productivemetalworks:casting/nuggets/iron',
        'productivemetalworks:casting/plates/alltheores/iron',
        'productivemetalworks:casting/plates/ftbmaterials/iron',
        'productivemetalworks:casting/rods/alltheores/iron',
        'productivemetalworks:casting/rods/ftbmaterials/iron',
        'productivemetalworks:casting/storage_blocks/iron'
    ]

    ironMeltingRecipes.forEach(id => event.remove({ id: id }))
    ironCastingRecipes.forEach(id => event.remove({ id: id }))
})
