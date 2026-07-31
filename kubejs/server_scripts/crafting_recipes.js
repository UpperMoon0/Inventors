// Standard crafting table recipes
// For shaped/shapeless crafting recipes (not Create mod machines)

ServerEvents.recipes(event => {
    // Vanilla leather is raw hide in this pack. Existing equipment and utility
    // recipes must use finished leather instead of fresh animal drops.
    event.replaceInput({}, 'minecraft:leather', 'kubejs:tanned_leather')

    const bedColors = [
        'white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime', 'pink',
        'gray', 'light_gray', 'cyan', 'purple', 'blue', 'brown', 'green',
        'red', 'black'
    ]

    bedColors.forEach(color => {
        // Remove the three-wool/three-plank recipe, but preserve bed-dyeing.
        event.remove({ id: `minecraft:${color}_bed` })
    })

    // Remove every competing recipe first; these blocks are progression gates.
    event.remove({ output: 'minecraft:crafting_table' })
    event.remove({ output: 'minecraft:chest' })
    event.remove({ output: 'minecraft:furnace' })

    event.shaped('minecraft:crafting_table', [
        'PF',
        'TP'
    ], {
        P: '#kubejs:primitive_planks',
        F: 'minecraft:flint',
        T: '#c:strings'
    }).id('kubejs:primitive/crafting_table')

    event.shaped('minecraft:chest', [
        'PPP',
        'PTP',
        'PPP'
    ], {
        P: '#kubejs:primitive_planks',
        T: '#c:strings'
    }).id('kubejs:primitive/bound_chest')

    // Clay can be fired at the campfire before the player owns a furnace.
    event.campfireCooking('minecraft:brick', 'minecraft:clay_ball', 0.1, 600)
        .id('kubejs:primitive/campfire_fired_brick')

    event.shaped('minecraft:furnace', [
        'CBC',
        'BFB',
        'CBC'
    ], {
        C: '#c:cobblestones',
        B: 'minecraft:brick',
        F: 'minecraft:campfire'
    }).id('kubejs:primitive/masonry_furnace')

    // Primitive pottery is shaped by hand and fired over a campfire. The
    // decorated pot is functional one-stack storage before bound chests.
    event.shaped('kubejs:unfired_basin', [
        'C C',
        'CCC'
    ], {
        C: 'minecraft:clay_ball'
    }).id('kubejs:primitive/unfired_basin')

    event.campfireCooking('kubejs:ceramic_basin', 'kubejs:unfired_basin', 0.1, 600)
        .id('kubejs:primitive/fire_ceramic_basin')

    event.shaped('kubejs:unfired_storage_pot', [
        'C C',
        'C C',
        'CCC'
    ], {
        C: 'minecraft:clay_ball'
    }).id('kubejs:primitive/unfired_storage_pot')

    event.campfireCooking('minecraft:decorated_pot', 'kubejs:unfired_storage_pot', 0.1, 800)
        .id('kubejs:primitive/fire_storage_pot')

    // A frame is consumed after drying a batch, representing worn cordage and
    // keeping preserved food useful without making it free.
    event.shaped('kubejs:drying_frame', [
        'STS',
        'T T',
        'STS'
    ], {
        S: 'minecraft:stick',
        T: '#c:strings'
    }).id('kubejs:primitive/drying_frame')

    event.shapeless(Item.of('kubejs:dried_meat', 4), [
        'kubejs:drying_frame',
        '#c:foods/raw_meat',
        '#c:foods/raw_meat',
        '#c:foods/raw_meat',
        '#c:foods/raw_meat'
    ]).id('kubejs:primitive/dry_meat')

    event.shapeless(Item.of('kubejs:dried_fish', 4), [
        'kubejs:drying_frame',
        '#c:foods/raw_fish',
        '#c:foods/raw_fish',
        '#c:foods/raw_fish',
        '#c:foods/raw_fish'
    ]).id('kubejs:primitive/dry_fish')

    event.shapeless(Item.of('kubejs:dried_berries', 4), [
        'kubejs:drying_frame',
        'minecraft:sweet_berries',
        'minecraft:sweet_berries',
        'minecraft:sweet_berries',
        'minecraft:sweet_berries'
    ]).id('kubejs:primitive/dry_berries')

    // Bark supplies tannins. Each stage is intentionally visible in JEI so
    // leather is a small survival craft rather than an immediate mob drop.
    event.shapeless(Item.of('kubejs:tree_bark', 2), [
        '#minecraft:logs',
        'minecraft:flint'
    ]).id('kubejs:primitive/strip_tree_bark')

    event.shapeless('kubejs:soaked_hide', [
        '#kubejs:raw_hides',
        'kubejs:ceramic_basin'
    ]).id('kubejs:primitive/soak_raw_hide')

    event.shapeless('kubejs:scraped_hide', [
        'kubejs:soaked_hide',
        'minecraft:flint'
    ]).id('kubejs:primitive/scrape_hide')

    event.shapeless('kubejs:tannin_soaked_hide', [
        'kubejs:scraped_hide',
        'kubejs:tree_bark',
        'kubejs:tree_bark',
        'kubejs:ceramic_basin'
    ]).id('kubejs:primitive/tannin_soak_hide')

    event.campfireCooking('kubejs:tanned_leather', 'kubejs:tannin_soaked_hide', 0.1, 600)
        .id('kubejs:primitive/dry_tanned_leather')

    event.shaped('minecraft:white_bed', [
        'WWW',
        'LLL',
        'PPP'
    ], {
        W: 'minecraft:white_wool',
        L: 'kubejs:tanned_leather',
        P: '#minecraft:planks'
    }).id('kubejs:primitive/leather_bound_bed')

    event.shaped('kubejs:bone_pickaxe', [
        'BBB',
        ' T ',
        ' S '
    ], {
        B: 'minecraft:bone',
        T: '#c:strings',
        S: 'minecraft:stick'
    }).id('kubejs:primitive/bone_pickaxe')

    event.shaped('kubejs:bone_axe', [
        'BB',
        'BS',
        ' T'
    ], {
        B: 'minecraft:bone',
        T: '#c:strings',
        S: 'minecraft:stick'
    }).id('kubejs:primitive/bone_axe')

    event.shaped('kubejs:bone_shovel', [
        'B',
        'T',
        'S'
    ], {
        B: 'minecraft:bone',
        T: '#c:strings',
        S: 'minecraft:stick'
    }).id('kubejs:primitive/bone_shovel')

    event.shaped('kubejs:bone_sword', [
        'B ',
        'BT',
        'S '
    ], {
        B: 'minecraft:bone',
        T: '#c:strings',
        S: 'minecraft:stick'
    }).id('kubejs:primitive/bone_sword')

    event.shaped('kubejs:bone_hoe', [
        'BB',
        ' T',
        ' S'
    ], {
        B: 'minecraft:bone',
        T: '#c:strings',
        S: 'minecraft:stick'
    }).id('kubejs:primitive/bone_hoe')

    event.shaped('kubejs:flint_pickaxe', [
        'FFF',
        ' T ',
        ' S '
    ], {
        F: 'minecraft:flint',
        T: '#c:strings',
        S: 'minecraft:stick'
    }).id('kubejs:primitive/flint_pickaxe')

    event.shaped('kubejs:flint_axe', [
        'FF',
        'FS',
        ' T'
    ], {
        F: 'minecraft:flint',
        T: '#c:strings',
        S: 'minecraft:stick'
    }).id('kubejs:primitive/flint_axe')

    event.shaped('kubejs:flint_shovel', [
        'F',
        'T',
        'S'
    ], {
        F: 'minecraft:flint',
        T: '#c:strings',
        S: 'minecraft:stick'
    }).id('kubejs:primitive/flint_shovel')

    event.shaped('kubejs:flint_sword', [
        'F ',
        'FT',
        'S '
    ], {
        F: 'minecraft:flint',
        T: '#c:strings',
        S: 'minecraft:stick'
    }).id('kubejs:primitive/flint_sword')

    event.shaped('kubejs:flint_hoe', [
        'FF',
        ' T',
        ' S'
    ], {
        F: 'minecraft:flint',
        T: '#c:strings',
        S: 'minecraft:stick'
    }).id('kubejs:primitive/flint_hoe')

    // Vanilla wood and stone tools bypass the parallel bone/flint tool lines.
    // Keep the items registered for loot and compatibility, but remove recipes.
    const disabledVanillaTools = [
        'minecraft:wooden_sword',
        'minecraft:wooden_pickaxe',
        'minecraft:wooden_axe',
        'minecraft:wooden_shovel',
        'minecraft:wooden_hoe',
        'minecraft:stone_sword',
        'minecraft:stone_pickaxe',
        'minecraft:stone_axe',
        'minecraft:stone_shovel',
        'minecraft:stone_hoe'
    ]

    disabledVanillaTools.forEach(tool => {
        event.remove({ output: tool })
    })

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

    // Andesite alloy marks the transition from cast bronze into Crude Create.
    // Keeping this as a hand recipe avoids a circular dependency on Create machines.
    event.remove({ id: 'create:crafting/materials/andesite_alloy' })
    event.remove({ id: 'create:crafting/materials/andesite_alloy_from_zinc' })
    event.shaped('create:andesite_alloy', [
        'NS',
        'SN'
    ], {
        N: 'ftbmaterials:bronze_nugget',
        S: '#c:stones'
    }).id('create:crafting/materials/andesite_alloy')

    // Pack coal dust into a reusable ceramic retort. The sealed charge must be
    // superheated before its volatile material is driven off as metallurgical coke.
    event.shaped('kubejs:sealed_coke_charge', [
        'DDD',
        'DBD',
        'DDD'
    ], {
        D: 'ftbmaterials:coal_dust',
        B: 'kubejs:ceramic_basin'
    }).id('kubejs:steel/pack_coke_charge')

    // A titanium mesh survives repeated high-temperature biocoke compression.
    // It is deliberately expensive once, then acts as a reusable catalyst.
    event.shaped('kubejs:titanium_catalyst_mesh', [
        'TRT',
        'RPR',
        'TRT'
    ], {
        T: 'ftbmaterials:titanium_plate',
        R: 'ftbmaterials:steel_rod',
        P: 'create:precision_mechanism'
    }).id('kubejs:biocoke/titanium_catalyst_mesh')

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
    // Basic is the Nether metallurgy tier. Invar proves Nether nickel
    // processing, while brass proves access to blaze-heated alloying.
    event.shaped(Item.of('createtiers:shaft_basic', 4), [
        'SBS',
        'BIB',
        'SBS'
    ], {
        S: 'createtiers:shaft_crude',
        B: 'create:brass_ingot',
        I: 'ftbmaterials:invar_ingot'
    })

    // Cogwheel Basic: previous cogwheel + both Nether-era alloys.
    event.shaped('createtiers:cogwheel_basic', [
        'CR',
        'N '
    ], {
        C: 'createtiers:cogwheel_crude',
        N: 'ftbmaterials:invar_ingot',
        R: 'create:brass_ingot'
    })

    // Large Cogwheel Basic: previous large cogwheel + both Nether-era alloys.
    event.shaped('createtiers:large_cogwheel_basic', [
        'LN',
        'NR'
    ], {
        L: 'createtiers:large_cogwheel_crude',
        N: 'ftbmaterials:invar_ingot',
        R: 'create:brass_ingot'
    })

    // ========== REFINED TIER RECIPES ==========
    // Refined is the End/aerospace tier. Titanium makes reaching and mining
    // the End a hard gate; steel and precision mechanisms prove automation.

    // Four upgraded shafts per batch: no free duplication from the prior tier.
    event.shaped(Item.of('createtiers:shaft_refined', 4), [
        'PSP',
        'STS',
        'PSP'
    ], {
        S: 'createtiers:shaft_basic',
        P: 'ftbmaterials:steel_plate',
        T: 'ftbmaterials:titanium_plate'
    })

    // Refined cogwheels require precision assembly as well as End metallurgy.
    event.shaped('createtiers:cogwheel_refined', [
        ' T ',
        'GCG',
        ' P '
    ], {
        C: 'createtiers:cogwheel_basic',
        G: 'ftbmaterials:steel_gear',
        T: 'ftbmaterials:titanium_plate',
        P: 'create:precision_mechanism'
    })

    // Large refined gearing consumes more titanium and steel throughput.
    event.shaped('createtiers:large_cogwheel_refined', [
        'TGT',
        'GLG',
        ' P '
    ], {
        L: 'createtiers:large_cogwheel_basic',
        G: 'ftbmaterials:steel_gear',
        T: 'ftbmaterials:titanium_plate',
        P: 'create:precision_mechanism'
    })

    // ========== SMALL TO LARGE COGWHEEL RECIPES (SHAPELESS) ==========
    // Large Cogwheel Basic: Small cogwheel + Invar (Shapeless)
    event.shapeless('createtiers:large_cogwheel_basic', [
        'createtiers:cogwheel_basic',
        'ftbmaterials:invar_ingot'
    ])

    // Large Cogwheel Refined: preserve the shortcut, but keep its End gate.
    event.shapeless('createtiers:large_cogwheel_refined', [
        'createtiers:cogwheel_refined',
        'ftbmaterials:titanium_plate',
        'ftbmaterials:steel_gear'
    ])
})
