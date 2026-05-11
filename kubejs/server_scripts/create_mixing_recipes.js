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
            '#c:stones',
            global.ITEMS.invar_nugget
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

    // Note: Invar Ingot Mixing requires 3 ingredients (2 iron + 1 nickel)
    // which exceeds the 2 fluid input limit in 1.21.1 for mixing recipes.
    // Use Pressing recipes instead for invar ingots.

    event.remove({ id: 'createbigcannons:mixing/alloy_bronze_brass' })
    event.remove({ id: 'createbigcannons:mixing/alloy_bronze_tin' })
    event.remove({ id: 'createbigcannons:mixing/alloy_bronze_tinless' })

    // Bronze Dust Mixing
    // Input: 3 copper_dust + 1 tin_dust
    // Output: 4 bronze_dust
    // No heat required (cold mixing)
    // Note: This uses items, not tags, so should work
    event.recipes.create.mixing(
        Item.of(`4x ${global.ITEMS.bronze_dust}`),
        [
            Item.of(`3x ${global.ITEMS.copper_dust}`),
            Item.of(global.ITEMS.tin_dust)
        ]
    )

    // Note: Bronze Ingot Mixing requires 4 ingredients (3 copper + 1 tin)
    // which exceeds the 2 fluid input limit in 1.21.1 for mixing recipes.
    // Use Pressing recipes instead for bronze ingots.

    // Invar Ingot Mixing
    // Input: 2 iron_ingots + 1 nickel_ingot
    // Output: 1 invar_ingot
    event.recipes.create.mixing(
        Item.of(`1x ${global.ITEMS.invar_ingot}`),
        [
            Item.of(`2x ${global.ITEMS.iron_ingot}`),
            Item.of(global.ITEMS.nickel_ingot)
        ]
    )

    // Bronze Ingot Mixing
    // Input: 3 copper_ingots + 1 tin_ingot
    // Output: 1 bronze_ingot
    event.recipes.create.mixing(
        Item.of(`1x ${global.ITEMS.bronze_ingot}`),
        [
            Item.of(`3x ${global.ITEMS.copper_ingot}`),
            Item.of(global.ITEMS.tin_ingot)
        ]
    )

    // ========================================
    // Tier 3: Carbon Reduction Processing
    // ========================================

    // Iron Carbon Reduction (Heated)
    // Input: 3 crushed_raw_iron + 1 coal/charcoal
    // Output: 4 iron_dust (100%), graphite_dust (20% chance)
    // Requires heat - carbon acts as reducing agent
event.recipes.create.mixing([
        Item.of(`4x ${global.ITEMS.iron_dust}`),
        CreateItem.of(global.ITEMS.graphite_dust, 0.2)
    ], [
        Item.of(`3x ${global.ITEMS.crushed_iron}`),
        '#kubejs:carbon_source'
    ]).heated()
})
