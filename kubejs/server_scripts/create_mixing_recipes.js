// Create Mixing recipes for alloys

ServerEvents.recipes(event => {
    // Remove original Andesite Alloy mixing recipes
    event.remove({ id: 'create:mixing/andesite_alloy' })
    event.remove({ id: 'create:mixing/andesite_alloy_from_zinc' })

    // Andesite alloy intentionally has no mixer recipe. Its bronze hand recipe
    // is the one-time bridge into Crude Create and prevents a circular gate.

    // Invar Dust Mixing
    // Input: 2 iron_dust + 1 nickel_dust
    // Output: 3 invar_dust
    // Create can automate powder blending after Crude is established. The
    // resulting dust still has to be melted in the foundry.
    event.recipes.create.mixing(
        Item.of(`3x ${global.ITEMS.invar_dust}`),
        [
            Item.of(`2x ${global.ITEMS.iron_dust}`),
            Item.of(global.ITEMS.nickel_dust)
        ]
    )

    // Bronze Dust Mixing
    // Input: 3 copper_dust + 1 tin_dust
    // Output: 4 bronze_dust
    // Powder blending is automation, not a furnace-smelting bypass.
    event.recipes.create.mixing(
        Item.of(`4x ${global.ITEMS.bronze_dust}`),
        [
            Item.of(`3x ${global.ITEMS.copper_dust}`),
            Item.of(global.ITEMS.tin_dust)
        ]
    )

    // Brass Dust Mixing - Nether heat gate for advanced Create automation
    // Input: 1 copper_dust + 1 zinc_dust
    // Output: 2 brass_dust
    // No heat required (cold mixing)
    event.recipes.create.mixing(
        Item.of(`2x ${global.ITEMS.brass_dust}`),
        [
            Item.of(global.ITEMS.copper_dust),
            Item.of(global.ITEMS.zinc_dust)
        ]
    ).heated()

    // Ingot alloying belongs to Productive Metalworks. Create mixes powders,
    // then later automates transport and preparation around the foundry.


    // Iron is the first reduced and forged metal. Calcite acts as flux while
    // charcoal supplies carbon and removes oxygen from the concentrated ore.
    event.recipes.create.mixing('kubejs:bloomery_charge', [
        '3x kubejs:iron_concentrate',
        Ingredient.of('#kubejs:coal_dusts', 2),
        'minecraft:calcite'
    ]).id('kubejs:iron/prepare_bloomery_charge')

    // Coke production is the superheated capstone of Nether processing. The
    // clay bucket is returned after the sealed charge has finished coking.
    event.recipes.create.compacting([
        '8x kubejs:metallurgical_coke',
        'firstworks:clay_bucket'
    ], 'kubejs:sealed_coke_charge')
        .superheated()
        .id('kubejs:steel/coke_sealed_charge')

    // Later industry captures tar from bark rather than wasting the volatile
    // binder. The ceramic vessel is returned after destructive distillation.
    event.recipes.create.compacting([
        Fluid.of('kubejs:wood_tar', 250),
        '2x minecraft:charcoal',
        'firstworks:clay_bucket'
    ], [
        '8x firstworks:tree_bark',
        'firstworks:clay_bucket'
    ])
        .superheated()
        .id('kubejs:biocoke/distill_wood_tar')

    // Four charcoal are consumed for each renewable coke equivalent. This is
    // deliberately less efficient than mined coal coke, but fully automatable.
    event.recipes.create.mixing('kubejs:green_biocoke', [
        '4x ftbmaterials:charcoal_dust',
        Fluid.of('kubejs:wood_tar', 250)
    ])
        .heated()
        .id('kubejs:biocoke/bind_green_briquette')

    // The titanium mesh is a reusable compression catalyst and provides the
    // hard post-titanium gate for renewable steel production.
    event.recipes.create.compacting([
        'kubejs:dense_biocoke',
        'kubejs:titanium_catalyst_mesh'
    ], [
        'kubejs:green_biocoke',
        'kubejs:titanium_catalyst_mesh'
    ])
        .superheated()
        .id('kubejs:biocoke/densify_with_titanium_mesh')
})
