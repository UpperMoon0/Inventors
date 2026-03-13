// Create Milling recipes for raw ores
// Milling uses the Millstone
// Supports multiple chance-based outputs

ServerEvents.recipes(event => {
    // Raw Iron Milling
    // Input: 1 raw_iron
    // Output: 1 crushed_iron (100%), 
    //         50% chance crushed_iron, 
    //         50% chance experience_nugget
    event.recipes.create.milling([
        global.ITEMS.crushed_iron,
        Item.of(global.ITEMS.crushed_iron).withChance(0.5),
        Item.of(global.ITEMS.experience_nugget).withChance(0.5)
    ], global.ITEMS.raw_iron)

    // Raw Copper Milling
    // Input: 1 raw_copper
    // Output: 1 crushed_copper (100%), 
    //         50% chance crushed_copper, 
    //         50% chance experience_nugget
    event.recipes.create.milling([
        global.ITEMS.crushed_copper,
        Item.of(global.ITEMS.crushed_copper).withChance(0.5),
        Item.of(global.ITEMS.experience_nugget).withChance(0.5)
    ], global.ITEMS.raw_copper)

    // Raw Gold Milling
    // Input: 1 raw_gold
    // Output: 1 crushed_gold (100%), 
    //         50% chance crushed_gold, 
    //         50% chance experience_nugget
    event.recipes.create.milling([
        global.ITEMS.crushed_gold,
        Item.of(global.ITEMS.crushed_gold).withChance(0.5),
        Item.of(global.ITEMS.experience_nugget).withChance(0.5)
    ], global.ITEMS.raw_gold)

    // Raw Zinc Milling
    // Input: 1 raw_zinc
    // Output: 1 crushed_zinc (100%), 
    //         50% chance crushed_zinc, 
    //         50% chance experience_nugget
    event.recipes.create.milling([
        global.ITEMS.crushed_zinc,
        Item.of(global.ITEMS.crushed_zinc).withChance(0.5),
        Item.of(global.ITEMS.experience_nugget).withChance(0.5)
    ], global.ITEMS.raw_zinc)

    // Raw Nickel Milling (Creating Space)
    // Input: 1 raw_nickel
    // Output: 1 crushed_nickel (100%), 
    //         50% chance crushed_nickel, 
    //         50% chance experience_nugget
    event.recipes.create.milling([
        global.ITEMS.crushed_nickel,
        Item.of(global.ITEMS.crushed_nickel).withChance(0.5),
        Item.of(global.ITEMS.experience_nugget).withChance(0.5)
    ], global.ITEMS.raw_nickel)

    // Raw Cobalt Milling (Creating Space)
    // Input: 1 raw_cobalt
    // Output: 1 crushed_cobalt (100%), 
    //         50% chance crushed_cobalt, 
    //         50% chance experience_nugget
    event.recipes.create.milling([
        global.ITEMS.crushed_cobalt,
        Item.of(global.ITEMS.crushed_cobalt).withChance(0.5),
        Item.of(global.ITEMS.experience_nugget).withChance(0.5)
    ], global.ITEMS.raw_cobalt)

    // Raw Aluminum Milling (Creating Space)
    // Input: 1 raw_aluminum
    // Output: 1 crushed_aluminum (100%), 
    //         50% chance crushed_aluminum, 
    //         50% chance experience_nugget
    event.recipes.create.milling([
        global.ITEMS.crushed_aluminum,
        Item.of(global.ITEMS.crushed_aluminum).withChance(0.5),
        Item.of(global.ITEMS.experience_nugget).withChance(0.5)
    ], global.ITEMS.raw_aluminum)

    // Raw Lead Milling
    // Input: 1 raw_lead
    // Output: 1 crushed_lead (100%), 
    //         50% chance crushed_lead, 
    //         50% chance experience_nugget
    event.recipes.create.milling([
        global.ITEMS.crushed_lead,
        Item.of(global.ITEMS.crushed_lead).withChance(0.5),
        Item.of(global.ITEMS.experience_nugget).withChance(0.5)
    ], global.ITEMS.raw_lead)

    // ========================================
    // Ingot to Dust Milling Recipes
    // ========================================

    // Iron Ingot -> Iron Dust
    // Input: 1 iron_ingot
    // Output: 1 iron_dust (100%)
    event.recipes.create.milling([
        global.ITEMS.iron_dust
    ], global.ITEMS.iron_ingot)

    // Nickel Ingot -> Nickel Dust
    // Input: 1 nickel_ingot
    // Output: 1 nickel_dust (100%)
    event.recipes.create.milling([
        global.ITEMS.nickel_dust
    ], global.ITEMS.nickel_ingot)
})
