// Create Milling recipes for raw ores
// Milling uses the Millstone
// Supports multiple chance-based outputs

ServerEvents.recipes(event => {
    // Raw Iron Milling
    // Input: 1 minecraft:raw_iron
    // Output: 1 create:crushed_raw_iron (100%), 
    //         50% chance create:crushed_raw_iron, 
    //         50% chance create:experience_nugget
    event.recipes.create.milling([
        'create:crushed_raw_iron',
        Item.of('create:crushed_raw_iron').withChance(0.5),
        Item.of('create:experience_nugget').withChance(0.5)
    ], 'minecraft:raw_iron')

    // Raw Copper Milling
    // Input: 1 minecraft:raw_copper
    // Output: 1 create:crushed_raw_copper (100%), 
    //         50% chance create:crushed_raw_copper, 
    //         50% chance create:experience_nugget
    event.recipes.create.milling([
        'create:crushed_raw_copper',
        Item.of('create:crushed_raw_copper').withChance(0.5),
        Item.of('create:experience_nugget').withChance(0.5)
    ], 'minecraft:raw_copper')

    // Raw Gold Milling
    // Input: 1 minecraft:raw_gold
    // Output: 1 create:crushed_raw_gold (100%), 
    //         50% chance create:crushed_raw_gold, 
    //         50% chance create:experience_nugget
    event.recipes.create.milling([
        'create:crushed_raw_gold',
        Item.of('create:crushed_raw_gold').withChance(0.5),
        Item.of('create:experience_nugget').withChance(0.5)
    ], 'minecraft:raw_gold')

    // Raw Zinc Milling
    // Input: 1 create:raw_zinc
    // Output: 1 create:crushed_raw_zinc (100%), 
    //         50% chance create:crushed_raw_zinc, 
    //         50% chance create:experience_nugget
    event.recipes.create.milling([
        'create:crushed_raw_zinc',
        Item.of('create:crushed_raw_zinc').withChance(0.5),
        Item.of('create:experience_nugget').withChance(0.5)
    ], 'create:raw_zinc')

    // Raw Nickel Milling (Creating Space)
    // Input: 1 creatingspace:raw_nickel
    // Output: 1 create:crushed_raw_nickel (100%), 
    //         50% chance create:crushed_raw_nickel, 
    //         50% chance create:experience_nugget
    event.recipes.create.milling([
        'create:crushed_raw_nickel',
        Item.of('create:crushed_raw_nickel').withChance(0.5),
        Item.of('create:experience_nugget').withChance(0.5)
    ], 'creatingspace:raw_nickel')

    // Raw Cobalt Milling (Creating Space)
    // Input: 1 creatingspace:raw_cobalt
    // Output: 1 create:crushed_raw_cobalt (100%), 
    //         50% chance create:crushed_raw_cobalt, 
    //         50% chance create:experience_nugget
    event.recipes.create.milling([
        'create:crushed_raw_cobalt',
        Item.of('create:crushed_raw_cobalt').withChance(0.5),
        Item.of('create:experience_nugget').withChance(0.5)
    ], 'creatingspace:raw_cobalt')

    // Raw Aluminum Milling (Creating Space)
    // Input: 1 creatingspace:raw_aluminum
    // Output: 1 create:crushed_raw_aluminum (100%), 
    //         50% chance create:crushed_raw_aluminum, 
    //         50% chance create:experience_nugget
    event.recipes.create.milling([
        'create:crushed_raw_aluminum',
        Item.of('create:crushed_raw_aluminum').withChance(0.5),
        Item.of('create:experience_nugget').withChance(0.5)
    ], 'creatingspace:raw_aluminum')
})
