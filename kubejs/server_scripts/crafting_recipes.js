// Standard crafting table recipes
// For shaped/shapeless crafting recipes (not Create mod machines)

ServerEvents.recipes(event => {
    // Disable default Create shaft, cogwheel, and large_cogwheel recipes
    event.remove({ output: 'create:shaft' })
    event.remove({ output: 'create:cogwheel' })
    event.remove({ output: 'create:large_cogwheel' })

    // Replace all recipes using create:shaft/cogwheel/large_cogwheel with our tiered tags
    event.replaceInput(
        { input: 'create:shaft' },
        'create:shaft',
        '#kubejs:shaft'
    )
    event.replaceInput(
        { input: 'create:cogwheel' },
        'create:cogwheel',
        '#kubejs:cogwheel'
    )
    event.replaceInput(
        { input: 'create:large_cogwheel' },
        'create:large_cogwheel',
        '#kubejs:large_cogwheel'
    )

    // Remove original Andesite Alloy crafting recipes and replace with new one using Invar and Stone
    event.remove({ id: 'create:crafting/materials/andesite_alloy' })
    event.remove({ id: 'create:crafting/materials/andesite_alloy_from_zinc' })
    event.shaped('create:andesite_alloy', [
        'NS',
        'SN'
    ], {
        N: '#kubejs:andesite_nugget',
        S: '#forge:stone'
    })

    // Remove original Electron Tube crafting recipe and replace with new one using Silver Plates
    event.remove({ id: 'create:crafting/materials/electron_tube' })
    event.shaped('create:electron_tube', [
        'R',
        'S'
    ], {
        R: 'create:polished_rose_quartz',
        S: 'ftbmaterials:silver_plate'
    })

    // Andesite Alloy -> 8 Shaft Crude (Shaped)
    event.shaped(Item.of('createtiers:shaft_crude', 8), [
        'A',
        'A'
    ], {
        A: 'create:andesite_alloy'
    })

    // Shaft Crude + Planks -> Cogwheel Crude (Shapeless)
    event.shapeless('createtiers:cogwheel_crude', [
        'createtiers:shaft_crude',
        '#minecraft:planks'
    ])

    // Large Cogwheel Crude
    event.shapeless('createtiers:large_cogwheel_crude', [
        'createtiers:cogwheel_crude',
        '#minecraft:planks'
    ])

    event.shaped('createtiers:large_cogwheel_crude', [
        'SP',
        'P '
    ], {
        S: 'createtiers:shaft_crude',
        P: '#minecraft:planks'
    })

    // ========== BASIC TIER RECIPES ==========
    // Shaft Basic: Previous shaft + Bronze-Invar (Shaped) -> 8
    event.shaped(Item.of('createtiers:shaft_basic', 8), [
        'SSS',
        'SMS',
        'SSS'
    ], {
        S: 'createtiers:shaft_crude',
        M: 'ftbmaterials:bronze_ingot'
    })

    // Cogwheel Basic: Previous cogwheel + Invar + Bronze nugget (Shaped)
    event.shaped('createtiers:cogwheel_basic', [
        'CR',
        'N '
    ], {
        C: 'createtiers:cogwheel_crude',
        N: 'ftbmaterials:invar_ingot',
        R: 'ftbmaterials:bronze_nugget'
    })

    // Large Cogwheel Basic: Previous large cogwheel + Invar + Bronze nugget (Shaped)
    event.shaped('createtiers:large_cogwheel_basic', [
        'LN',
        'NR'
    ], {
        L: 'createtiers:large_cogwheel_crude',
        N: 'ftbmaterials:invar_ingot',
        R: 'ftbmaterials:bronze_nugget'
    })

    // ========== REFINED TIER RECIPES ==========
    // Shaft Refined: Previous shaft + Steel-Diamond (Shaped) -> 8
    event.shaped(Item.of('createtiers:shaft_refined', 8), [
        'SSS',
        'SMS',
        'SSS'
    ], {
        S: 'createtiers:shaft_basic',
        M: 'ftbmaterials:steel_ingot'
    })

    // Cogwheel Refined: Previous cogwheel + Diamond + Steel nugget (Shaped)
    event.shaped('createtiers:cogwheel_refined', [
        'CR',
        'N '
    ], {
        C: 'createtiers:cogwheel_basic',
        N: 'minecraft:diamond',
        R: 'ftbmaterials:steel_nugget'
    })

    // Large Cogwheel Refined: Previous large cogwheel + Diamond + Steel nugget (Shaped)
    event.shaped('createtiers:large_cogwheel_refined', [
        'LN',
        'NR'
    ], {
        L: 'createtiers:large_cogwheel_basic',
        N: 'minecraft:diamond',
        R: 'ftbmaterials:steel_nugget'
    })

    // ========== SMALL TO LARGE COGWHEEL RECIPES (SHAPELESS) ==========
    // Large Cogwheel Basic: Small cogwheel + Invar (Shapeless)
    event.shapeless('createtiers:large_cogwheel_basic', [
        'createtiers:cogwheel_basic',
        'ftbmaterials:invar_ingot'
    ])

    // Large Cogwheel Refined: Small cogwheel + Diamond (Shapeless)
    event.shapeless('createtiers:large_cogwheel_refined', [
        'createtiers:cogwheel_refined',
        'minecraft:diamond'
    ])
})
