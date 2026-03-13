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
    event.remove({ id: 'create:crushing/nickel_ore' })
    event.remove({ id: 'creatingspace:ressources/crushed_cobalt_ore' })
    event.remove({ id: 'create:crushing/aluminum_ore' })
    
    // Raw Iron Crushing
    // Input: 1 raw_iron
    // Output: 2 crushed_iron (100%), 
    //         10% chance crushed_nickel (byproduct - iron-nickel deposits)
    //         75% chance experience_nugget
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_iron}`),
        Item.of(global.ITEMS.crushed_nickel).withChance(0.1),
        Item.of(global.ITEMS.experience_nugget).withChance(0.75)
    ], global.ITEMS.raw_iron)

    // Raw Copper Crushing
    // Input: 1 raw_copper
    // Output: 2 crushed_copper (100%), 
    //         10% chance crushed_gold (byproduct - copper-gold porphyry)
    //         75% chance experience_nugget
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_copper}`),
        Item.of(global.ITEMS.crushed_gold).withChance(0.1),
        Item.of(global.ITEMS.experience_nugget).withChance(0.75)
    ], global.ITEMS.raw_copper)

    // Raw Gold Crushing
    // Input: 1 raw_gold
    // Output: 2 crushed_gold (100%), 
    //         10% chance crushed_silver (byproduct - gold-silver electrum veins)
    //         75% chance experience_nugget
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_gold}`),
        Item.of(global.ITEMS.crushed_silver).withChance(0.1),
        Item.of(global.ITEMS.experience_nugget).withChance(0.75)
    ], global.ITEMS.raw_gold)

    // Raw Zinc Crushing
    // Input: 1 raw_zinc
    // Output: 2 crushed_zinc (100%), 
    //         10% chance crushed_lead (byproduct - zinc-lead sulfide deposits)
    //         75% chance experience_nugget
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_zinc}`),
        Item.of(global.ITEMS.crushed_lead).withChance(0.1),
        Item.of(global.ITEMS.experience_nugget).withChance(0.75)
    ], global.ITEMS.raw_zinc)

    // Raw Lead Crushing
    // Input: 1 raw_lead
    // Output: 2 crushed_lead (100%), 
    //         10% chance crushed_zinc (byproduct - lead-zinc sulfide deposits)
    //         75% chance experience_nugget
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_lead}`),
        Item.of(global.ITEMS.crushed_zinc).withChance(0.1),
        Item.of(global.ITEMS.experience_nugget).withChance(0.75)
    ], global.ITEMS.raw_lead)

    // Raw Nickel Crushing (Creating Space)
    // Input: 1 raw_nickel
    // Output: 2 crushed_nickel (100%), 
    //         10% chance crushed_cobalt (byproduct - nickel-cobalt laterite)
    //         75% chance experience_nugget
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_nickel}`),
        Item.of(global.ITEMS.crushed_cobalt).withChance(0.1),
        Item.of(global.ITEMS.experience_nugget).withChance(0.75)
    ], global.ITEMS.raw_nickel)

    // Raw Cobalt Crushing (Creating Space)
    // Input: 1 raw_cobalt
    // Output: 2 crushed_cobalt (100%), 
    //         10% chance crushed_nickel (byproduct - cobalt-nickel deposits)
    //         75% chance experience_nugget
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_cobalt}`),
        Item.of(global.ITEMS.crushed_nickel).withChance(0.1),
        Item.of(global.ITEMS.experience_nugget).withChance(0.75)
    ], global.ITEMS.raw_cobalt)

    // Raw Aluminum Crushing (Creating Space)
    // Input: 1 raw_aluminum
    // Output: 2 crushed_aluminum (100%), 
    //         10% chance crushed_iron (byproduct - bauxite contains iron)
    //         75% chance experience_nugget
    event.recipes.create.crushing([
        Item.of(`2x ${global.ITEMS.crushed_aluminum}`),
        Item.of(global.ITEMS.crushed_iron).withChance(0.1),
        Item.of(global.ITEMS.experience_nugget).withChance(0.75)
    ], global.ITEMS.raw_aluminum)

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
})
