// Create Crushing recipes for raw ores
// Crushing uses the Crushing Wheel
// 1 raw ore -> 2 crushed raw ore + 75% chance experience nugget + 10% chance byproduct

ServerEvents.recipes(event => {
    // Remove existing crushing recipes for raw ores
    event.remove({ id: 'create:crushing/raw_iron' })
    event.remove({ id: 'create:crushing/raw_copper' })
    event.remove({ id: 'create:crushing/raw_gold' })
    event.remove({ id: 'create:crushing/raw_zinc' })
    event.remove({ id: 'create:crushing/raw_nickel' })
    event.remove({ id: 'create:crushing/raw_lead' })
    event.remove({ id: 'create:crushing/raw_silver' })
    event.remove({ id: 'create:crushing/raw_tin' })
    event.remove({ id: 'create:crushing/raw_aluminum' })

    // Raw Iron Crushing
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_iron}`),
        CreateItem.of(global.ITEMS.crushed_nickel, 0.1),
        CreateItem.of(global.ITEMS.experience_nugget, 0.75)
    ], global.ITEMS.raw_iron)

    // Raw Copper Crushing
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_copper}`),
        CreateItem.of(global.ITEMS.crushed_gold, 0.1),
        CreateItem.of(global.ITEMS.experience_nugget, 0.75)
    ], global.ITEMS.raw_copper)

    // Raw Gold Crushing
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_gold}`),
        CreateItem.of(global.ITEMS.crushed_silver, 0.1),
        CreateItem.of(global.ITEMS.experience_nugget, 0.75)
    ], global.ITEMS.raw_gold)

    // Raw Zinc Crushing
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_zinc}`),
        CreateItem.of(global.ITEMS.crushed_lead, 0.1),
        CreateItem.of(global.ITEMS.experience_nugget, 0.75)
    ], global.ITEMS.raw_zinc)

    // Raw Lead Crushing - using item ID, not tag
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_lead}`),
        CreateItem.of(global.ITEMS.crushed_zinc, 0.1),
        CreateItem.of(global.ITEMS.experience_nugget, 0.75)
    ], global.ITEMS.raw_lead)

    // Raw Nickel Crushing - using item ID, not tag
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_nickel}`),
        CreateItem.of(global.ITEMS.crushed_iron, 0.1),
        CreateItem.of(global.ITEMS.experience_nugget, 0.75)
    ], global.ITEMS.raw_nickel)

    // Raw Aluminum Crushing
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_aluminum}`),
        CreateItem.of(global.ITEMS.crushed_iron, 0.1),
        CreateItem.of(global.ITEMS.experience_nugget, 0.75)
    ], global.ITEMS.raw_aluminum)

    // Raw Tin Crushing - using item ID, not tag
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_tin}`),
        CreateItem.of(global.ITEMS.crushed_lead, 0.1),
        CreateItem.of(global.ITEMS.experience_nugget, 0.75)
    ], global.ITEMS.raw_tin)

    // ========================================
    // Ingot to Dust Crushing Recipes
    // ========================================

    // Iron Ingot -> Iron Dust
    // Input: 1 iron_ingot
    // Output: 1 iron_dust (100%)
    event.recipes.create.crushing([
        global.ITEMS.iron_dust
    ], global.ITEMS.iron_ingot)

    // Nickel Ingot -> Nickel Dust
    // Input: 1 nickel_ingot
    // Output: 1 nickel_dust (100%)
    event.recipes.create.crushing([
        global.ITEMS.nickel_dust
    ], global.ITEMS.nickel_ingot)

    // Copper Ingot -> Copper Dust
    // Input: 1 copper_ingot
    // Output: 1 copper_dust (100%)
    event.recipes.create.crushing([
        global.ITEMS.copper_dust
    ], global.ITEMS.copper_ingot)

    // Tin Ingot -> Tin Dust
    // Input: 1 tin_ingot
    // Output: 1 tin_dust (100%)
    event.recipes.create.crushing([
        global.ITEMS.tin_dust
    ], global.ITEMS.tin_ingot)

    // Lead Ingot -> Lead Dust
    // Input: 1 lead_ingot
    // Output: 1 lead_dust (100%)
    event.recipes.create.crushing([
        global.ITEMS.lead_dust
    ], global.ITEMS.lead_ingot)

    // Zinc Ingot -> Zinc Dust
    // Input: 1 zinc_ingot
    // Output: 1 zinc_dust (100%)
    event.recipes.create.crushing([
        global.ITEMS.zinc_dust
    ], global.ITEMS.zinc_ingot)

    // ========================================
    // Silver Ore Processing
    // ========================================

    // Raw Silver Crushing
    // Input: 1 raw_silver
    // Output: 2 crushed_silver (100%),
    //         10% chance crushed_gold (byproduct - silver-gold veins)
    //         75% chance experience_nugget
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_silver}`),
        CreateItem.of(global.ITEMS.crushed_gold, 0.1),
        CreateItem.of(global.ITEMS.experience_nugget, 0.75)
    ], global.ITEMS.raw_silver)

    // Silver Ingot -> Silver Dust
    // Input: 1 silver_ingot
    // Output: 1 silver_dust (100%)
    event.recipes.create.crushing([
        global.ITEMS.silver_dust
    ], global.ITEMS.silver_ingot)

    // Coal/Charcoal -> Coal Dust / Charcoal Dust
    event.recipes.create.crushing([
        'ftbmaterials:coal_dust'
    ], Ingredient.of('minecraft:coal'))

    event.recipes.create.crushing([
        'ftbmaterials:charcoal_dust'
    ], Ingredient.of('minecraft:charcoal'))

    // ========================================
    // Uranium Ore Processing
    // ========================================

    // Raw Uranium Crushing
    // Input: 1 raw_uranium
    // Output: 2 crushed_uranium (100%),
    //         10% chance crushed_lead (byproduct - uranium-lead deposits)
    //         75% chance experience_nugget
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_uranium}`),
        CreateItem.of(global.ITEMS.crushed_lead, 0.1),
        CreateItem.of(global.ITEMS.experience_nugget, 0.75)
    ], global.ITEMS.raw_uranium)

    // Uranium Ingot -> Uranium Dust
    // Input: 1 uranium_ingot
    // Output: 1 uranium_dust (100%)
    event.recipes.create.crushing([
        global.ITEMS.uranium_dust
    ], global.ITEMS.uranium_ingot)
})