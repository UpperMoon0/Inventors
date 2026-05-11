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
        CreateItem.of(global.ITEMS.crushed_iron, 0.5),
        CreateItem.of(global.ITEMS.experience_nugget, 0.5)
    ], global.ITEMS.raw_iron)

    // Raw Copper Milling
    event.recipes.create.milling([
        global.ITEMS.crushed_copper,
        CreateItem.of(global.ITEMS.crushed_copper, 0.5),
        CreateItem.of(global.ITEMS.experience_nugget, 0.5)
    ], global.ITEMS.raw_copper)

    // Raw Gold Milling
    event.recipes.create.milling([
        global.ITEMS.crushed_gold,
        CreateItem.of(global.ITEMS.crushed_gold, 0.5),
        CreateItem.of(global.ITEMS.experience_nugget, 0.5)
    ], global.ITEMS.raw_gold)

    // Raw Zinc Milling
    event.recipes.create.milling([
        global.ITEMS.crushed_zinc,
        CreateItem.of(global.ITEMS.crushed_zinc, 0.5),
        CreateItem.of(global.ITEMS.experience_nugget, 0.5)
    ], global.ITEMS.raw_zinc)

    // Raw Nickel Milling
    event.recipes.create.milling([
        global.ITEMS.crushed_nickel,
        CreateItem.of(global.ITEMS.crushed_nickel, 0.5),
        CreateItem.of(global.ITEMS.experience_nugget, 0.5)
    ], global.ITEMS.raw_nickel)

    // Raw Aluminum Milling
    event.recipes.create.milling([
        global.ITEMS.crushed_aluminum,
        CreateItem.of(global.ITEMS.crushed_aluminum, 0.5),
        CreateItem.of(global.ITEMS.experience_nugget, 0.5)
    ], global.ITEMS.raw_aluminum)

    // Raw Lead Milling
    event.recipes.create.milling([
        global.ITEMS.crushed_lead,
        CreateItem.of(global.ITEMS.crushed_lead, 0.5),
        CreateItem.of(global.ITEMS.experience_nugget, 0.5)
    ], global.ITEMS.raw_lead)

    // Raw Tin Milling
    event.recipes.create.milling([
        global.ITEMS.crushed_tin,
        CreateItem.of(global.ITEMS.crushed_tin, 0.5),
        CreateItem.of(global.ITEMS.experience_nugget, 0.5)
    ], global.ITEMS.raw_tin)

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

    // Copper Ingot -> Copper Dust
    // Input: 1 copper_ingot
    // Output: 1 copper_dust (100%)
    event.recipes.create.milling([
        global.ITEMS.copper_dust
    ], global.ITEMS.copper_ingot)

    // Tin Ingot -> Tin Dust
    // Input: 1 tin_ingot
    // Output: 1 tin_dust (100%)
    event.recipes.create.milling([
        global.ITEMS.tin_dust
    ], global.ITEMS.tin_ingot)

    // Lead Ingot -> Lead Dust
    // Input: 1 lead_ingot
    // Output: 1 lead_dust (100%)
    event.recipes.create.milling([
        global.ITEMS.lead_dust
    ], global.ITEMS.lead_ingot)

    // Zinc Ingot -> Zinc Dust
    // Input: 1 zinc_ingot
    // Output: 1 zinc_dust (100%)
    event.recipes.create.milling([
        global.ITEMS.zinc_dust
    ], global.ITEMS.zinc_ingot)

    // ========================================
    // Silver Ore Processing
    // ========================================

    // Raw Silver Milling
    // Input: 1 raw_silver
    // Output: 1 crushed_silver (100%),
    //         50% chance crushed_silver,
    //         50% chance experience_nugget
    event.recipes.create.milling([
        global.ITEMS.crushed_silver,
        CreateItem.of(global.ITEMS.crushed_silver, 0.5),
        CreateItem.of(global.ITEMS.experience_nugget, 0.5)
    ], global.ITEMS.raw_silver)

    // Silver Ingot -> Silver Dust
    // Input: 1 silver_ingot
    // Output: 1 silver_dust (100%)
    event.recipes.create.milling([
        global.ITEMS.silver_dust
    ], global.ITEMS.silver_ingot)

    // ========================================
    // Uranium Ore Processing
    // ========================================

    // Raw Uranium Milling
    // Input: 1 raw_uranium
    // Output: 1 crushed_uranium (100%),
    //         50% chance crushed_uranium,
    //         50% chance experience_nugget
    event.recipes.create.milling([
        global.ITEMS.crushed_uranium,
        CreateItem.of(global.ITEMS.crushed_uranium, 0.5),
        CreateItem.of(global.ITEMS.experience_nugget, 0.5)
    ], global.ITEMS.raw_uranium)

    // Uranium Ingot -> Uranium Dust
    // Input: 1 uranium_ingot
    // Output: 1 uranium_dust (100%)
    event.recipes.create.milling([
        global.ITEMS.uranium_dust
    ], global.ITEMS.uranium_ingot)
})