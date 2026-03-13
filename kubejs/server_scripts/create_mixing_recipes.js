// Create Mixing recipes for alloys

ServerEvents.recipes(event => {
    // Remove original Andesite Alloy mixing recipes
    event.remove({ id: 'create:mixing/materials/andesite_alloy' })
    event.remove({ id: 'create:mixing/materials/andesite_alloy_from_zinc' })

    // Andesite Alloy Mixing
    // Input: 1 stone + 1 invar nugget
    // Output: 1 andesite_alloy
    event.recipes.create.mixing(
        'create:andesite_alloy',
        [
            '#forge:stone',
            '#forge:nuggets/invar'
        ]
    )

    // Invar Dust Mixing
    // Input: 2 iron_dust + 1 nickel_dust
    // Output: 3 invar_dust
    // No heat required (cold mixing)
    event.recipes.create.mixing(
        Item.of(`3x ${global.ITEMS.invar_dust}`),
        [
            Item.of(`2x ${global.ITEMS.iron_dust}`),
            Item.of(global.ITEMS.nickel_dust)
        ]
    )

    // Invar Ingot Mixing (Heated)
    // Input: 2 iron (ingot or dust) + 1 nickel (ingot or dust)
    // Output: 3 invar_ingot
    // Requires heat
    event.recipes.create.mixing(
        Item.of(`3x ${global.ITEMS.invar_ingot}`),
        [
            Item.of('2x #kubejs:iron_material'),
            Item.of('#kubejs:nickel_material')
        ]
    ).heated()

    event.remove({ id: 'createbigcannons:mixing/alloy_bronze_brass' })
    event.remove({ id: 'createbigcannons:mixing/alloy_bronze_tin' })
    event.remove({ id: 'createbigcannons:mixing/alloy_bronze_tinless' })

    // Bronze Dust Mixing
    // Input: 3 copper_dust + 1 tin_dust
    // Output: 4 bronze_dust
    // No heat required (cold mixing)
    event.recipes.create.mixing(
        Item.of(`4x ${global.ITEMS.bronze_dust}`),
        [
            Item.of(`3x ${global.ITEMS.copper_dust}`),
            Item.of(global.ITEMS.tin_dust)
        ]
    )

    // Bronze Ingot Mixing (Heated)
    // Input: 3 copper (ingot or dust) + 1 tin (ingot or dust)
    // Output: 4 bronze_ingot
    // Requires heat
    event.recipes.create.mixing(
        Item.of(`4x ${global.ITEMS.bronze_ingot}`),
        [
            Item.of('3x #kubejs:copper_material'),
            Item.of('#kubejs:tin_material')
        ]
    ).heated()

    // ========================================
    // Tier 3: Carbon Reduction Processing
    // ========================================

    // Iron Carbon Reduction (Heated)
    // Input: 3 crushed_raw_iron + 1 coal/charcoal
    // Output: 4 iron_dust (100%), graphite_dust (20% chance)
    // Requires heat - carbon acts as reducing agent
    event.recipes.create.mixing([
        Item.of(`4x ${global.ITEMS.iron_dust}`),
        Item.of(global.ITEMS.graphite_dust).withChance(0.2)
    ], [
        Item.of(`3x ${global.ITEMS.crushed_iron}`),
        '#kubejs:carbon_source'
    ]).heated()
})
