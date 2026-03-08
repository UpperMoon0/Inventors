// Create Crushing recipes for raw ores
// Crushing uses the Crushing Wheel
// 1 raw ore -> 2 crushed raw ore + 75% chance experience nugget + 10% chance byproduct

ServerEvents.recipes(event => {
    // Remove existing crushing recipes for raw ores
    event.remove({ id: 'create:crushing/raw_iron' })
    event.remove({ id: 'create:crushing/raw_copper' })
    event.remove({ id: 'create:crushing/raw_gold' })
    event.remove({ id: 'create:crushing/raw_zinc' })
    event.remove({ id: 'create:crushing/nickel_ore' })
    event.remove({ id: 'creatingspace:ressources/crushed_cobalt_ore' })
    event.remove({ id: 'create:crushing/aluminum_ore' })
    
    // Raw Iron Crushing
    // Input: 1 minecraft:raw_iron
    // Output: 2 create:crushed_raw_iron (100%), 
    //         10% chance create:crushed_raw_nickel (byproduct - iron-nickel deposits)
    //         75% chance create:experience_nugget
    event.recipes.create.crushing([
        Item.of('2x create:crushed_raw_iron'),
        Item.of('create:crushed_raw_nickel').withChance(0.1),
        Item.of('create:experience_nugget').withChance(0.75)
    ], 'minecraft:raw_iron')

    // Raw Copper Crushing
    // Input: 1 minecraft:raw_copper
    // Output: 2 create:crushed_raw_copper (100%), 
    //         10% chance create:crushed_raw_gold (byproduct - copper-gold porphyry)
    //         75% chance create:experience_nugget
    event.recipes.create.crushing([
        Item.of('2x create:crushed_raw_copper'),
        Item.of('create:crushed_raw_gold').withChance(0.1),
        Item.of('create:experience_nugget').withChance(0.75)
    ], 'minecraft:raw_copper')

    // Raw Gold Crushing
    // Input: 1 minecraft:raw_gold
    // Output: 2 create:crushed_raw_gold (100%), 
    //         75% chance create:experience_nugget
    // No byproduct - silver/lead not available in modpack
    event.recipes.create.crushing([
        Item.of('2x create:crushed_raw_gold'),
        Item.of('create:experience_nugget').withChance(0.75)
    ], 'minecraft:raw_gold')

    // Raw Zinc Crushing
    // Input: 1 create:raw_zinc
    // Output: 2 create:crushed_raw_zinc (100%), 
    //         75% chance create:experience_nugget
    // No byproduct - lead not available in modpack
    event.recipes.create.crushing([
        Item.of('2x create:crushed_raw_zinc'),
        Item.of('create:experience_nugget').withChance(0.75)
    ], 'create:raw_zinc')

    // Raw Nickel Crushing (Creating Space)
    // Input: 1 creatingspace:raw_nickel
    // Output: 2 create:crushed_raw_nickel (100%), 
    //         10% chance creatingspace:crushed_cobalt_ore (byproduct - nickel-cobalt laterite)
    //         75% chance create:experience_nugget
    event.recipes.create.crushing([
        Item.of('2x create:crushed_raw_nickel'),
        Item.of('creatingspace:crushed_cobalt_ore').withChance(0.1),
        Item.of('create:experience_nugget').withChance(0.75)
    ], 'creatingspace:raw_nickel')

    // Raw Cobalt Crushing (Creating Space)
    // Input: 1 creatingspace:raw_cobalt
    // Output: 2 creatingspace:crushed_cobalt_ore (100%), 
    //         10% chance create:crushed_raw_nickel (byproduct - cobalt-nickel deposits)
    //         75% chance create:experience_nugget
    event.recipes.create.crushing([
        Item.of('2x creatingspace:crushed_cobalt_ore'),
        Item.of('create:crushed_raw_nickel').withChance(0.1),
        Item.of('create:experience_nugget').withChance(0.75)
    ], 'creatingspace:raw_cobalt')

    // Raw Aluminum Crushing (Creating Space)
    // Input: 1 creatingspace:raw_aluminum
    // Output: 2 create:crushed_raw_aluminum (100%), 
    //         10% chance create:crushed_raw_iron (byproduct - bauxite contains iron)
    //         75% chance create:experience_nugget
    event.recipes.create.crushing([
        Item.of('2x create:crushed_raw_aluminum'),
        Item.of('create:crushed_raw_iron').withChance(0.1),
        Item.of('create:experience_nugget').withChance(0.75)
    ], 'creatingspace:raw_aluminum')
})
