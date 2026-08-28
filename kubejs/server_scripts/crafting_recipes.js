// Standard crafting table recipes
// For shaped/shapeless crafting recipes (not Create mod machines)

ServerEvents.recipes(event => {
    // Firstworks owns bed progression: Cloth, matching Clean Wool, and planks.

    // Remove every competing recipe first; these blocks are progression gates.
    event.remove({ output: 'minecraft:campfire' })
    event.remove({ output: 'minecraft:crafting_table' })
    event.remove({ output: 'minecraft:chest' })
    event.remove({ output: 'minecraft:barrel' })
    event.remove({ output: 'minecraft:furnace' })
    event.remove({ output: 'minecraft:torch' })

    // The single-use starter provides the first spark. Bulk charcoal is reserved
    // for the late-Stone Firstworks Charcoal Clamp.
    event.shaped('minecraft:campfire', [
        ' S ',
        'SFS',
        'LLL'
    ], {
        S: 'minecraft:stick',
        F: 'firstworks:fire_starter',
        L: '#minecraft:logs_that_burn'
    }).id('kubejs:primitive/flint_lit_campfire')

    // Progression invariant: an ordinary campfire must never turn logs into charcoal.
    event.remove({ id: 'kubejs:primitive/campfire_charcoal' })

    // Twine and vanilla string are inexpensive enough for early bound torches;
    // proper rope remains reserved for heavier construction.
    event.shaped(Item.of('minecraft:torch', 4), [
        'C',
        'T',
        'S'
    ], {
        C: '#minecraft:coals',
        T: '#c:strings',
        S: 'minecraft:stick'
    }).id('kubejs:primitive/bound_torches')

    event.shaped('minecraft:crafting_table', [
        'PF',
        'TP'
    ], {
        P: '#kubejs:primitive_planks',
        F: 'minecraft:flint',
        T: '#c:ropes'
    }).id('kubejs:primitive/crafting_table')

    event.shaped('minecraft:chest', [
        'PPP',
        'PCP',
        'PPP'
    ], {
        P: '#minecraft:planks',
        C: 'firstworks:copper_fasteners'
    }).id('kubejs:copper/copper_bound_chest')

    // Barrels would otherwise bypass the intended pottery storage stage.
    event.shaped('minecraft:barrel', [
        'PSP',
        'PCP',
        'PSP'
    ], {
        P: '#minecraft:planks',
        S: '#minecraft:wooden_slabs',
        C: 'firstworks:copper_fasteners'
    }).id('kubejs:copper/copper_bound_barrel')

    // The vanilla utility items represent early copper sheetwork in this pack.
    // Their default iron recipes remain harmless because iron is a later age, but
    // these recipes make the intended Copper route explicit.
    event.shaped('minecraft:shears', [
        ' C',
        'C '
    ], {
        C: 'minecraft:copper_ingot'
    }).id('kubejs:copper/copper_shears')

    event.shaped('minecraft:bucket', [
        'C C',
        ' C '
    ], {
        C: 'minecraft:copper_ingot'
    }).id('kubejs:copper/copper_bucket')

    // The Masonry Furnace is constructed from Cobblestone, Brick Blocks (from Firstworks masonry), and finished Leather.
    event.shaped('minecraft:furnace', [
        'CBC',
        'BLB',
        'CBC'
    ], {
        C: '#c:cobblestones',
        B: 'minecraft:bricks',
        L: 'minecraft:leather'
    }).id('kubejs:primitive/masonry_furnace')

    // Primitive pottery is shaped by hand and fired over a campfire. The
    // decorated pot is functional one-stack storage before bound chests.
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

    // Farmer's Delight rope bypass fix: remove cheap straw recipe and convert 1:1 with Firstworks rope
    event.remove({ id: 'farmersdelight:rope' })
    event.shapeless('farmersdelight:rope', ['firstworks:rope']).id('kubejs:primitive/firstworks_to_fd_rope')
    event.shapeless('firstworks:rope', ['farmersdelight:rope']).id('kubejs:primitive/fd_to_firstworks_rope')

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
        B: 'firstworks:clay_bucket'
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
