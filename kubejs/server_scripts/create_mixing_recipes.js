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


    // ========================================
    // Tier 3: Carbon Reduction Processing
    // ========================================

// Iron Carbon Reduction (Heated)
// Input: 3 crushed_iron + 2 coal
// Output: 4 iron_dust (100%), graphite_dust (20% chance)
// Requires heat - carbon acts as reducing agent
event.recipes.create.mixing([
        '4x ftbmaterials:iron_dust',
        CreateItem.of('ftbmaterials:graphite_dust', 0.2)
    ], [
        '3x create:crushed_raw_iron',
        Ingredient.of('#kubejs:coal_dusts', 2)
    ]).heated()

// Steel Nugget Production (Heated)
// Input: 24 iron_nugget + 1 coal/charcoal dust
// Output: 9 steel_nugget
event.recipes.create.mixing([
        '9x ftbmaterials:steel_nugget'
    ], [
        '24x minecraft:iron_nugget',
        Ingredient.of('#kubejs:coal_dusts')
    ]).heated()
})
