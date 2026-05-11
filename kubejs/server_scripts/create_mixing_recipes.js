// Create Mixing recipes for alloys

ServerEvents.recipes(event => {
    // Remove original Andesite Alloy mixing recipes
    event.remove({ id: 'create:mixing/andesite_alloy' })
    event.remove({ id: 'create:mixing/andesite_alloy_from_zinc' })

    // Andesite Alloy Mixing
    // Input: 1 stone + 1 invar nugget
    // Output: 1 andesite_alloy
    event.recipes.create.mixing(
        'create:andesite_alloy',
        [
            Ingredient.of('#c:stones'),
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

    // Brass Dust Mixing
    // Input: 1 copper_dust + 1 zinc_dust
    // Output: 2 brass_dust
    // No heat required (cold mixing)
    event.recipes.create.mixing(
        Item.of(`2x ${global.ITEMS.brass_dust}`),
        [
            Item.of(global.ITEMS.copper_dust),
            Item.of(global.ITEMS.zinc_dust)
        ]
    )

    // Invar Ingot Mixing
    // Input: 2 iron_ingots + 1 nickel_ingot
    // Output: 1 invar_ingot
    event.recipes.create.mixing(
        Item.of(`1x ${global.ITEMS.invar_ingot}`),
        [
            Ingredient.of('#kubejs:iron_material', 2),
            Ingredient.of('#kubejs:nickel_material')
        ]
    ).heated()

    // Bronze Ingot Mixing
    // Input: 3 copper_ingots + 1 tin_ingot
    // Output: 1 bronze_ingot
    event.recipes.create.mixing(
        Item.of(`1x ${global.ITEMS.bronze_ingot}`),
        [
            Ingredient.of('#kubejs:copper_material', 3),
            Ingredient.of('#kubejs:tin_material')
        ]
    ).heated()


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
