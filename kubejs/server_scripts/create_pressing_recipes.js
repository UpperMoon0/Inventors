// Create Pressing recipes
// Pressing uses the Mechanical Press

ServerEvents.recipes(event => {
    event.recipes.create.pressing(
        'kubejs:worked_iron_bloom',
        'kubejs:iron_bloom'
    ).id('kubejs:iron/work_bloom')

    event.recipes.create.pressing(
        'kubejs:wrought_iron_billet',
        'kubejs:worked_iron_bloom'
    ).id('kubejs:iron/forge_billet')

    event.recipes.create.pressing(
        '3x minecraft:iron_ingot',
        'kubejs:wrought_iron_billet'
    ).id('kubejs:iron/forge_ingots')

    // Silver Ingot -> Silver Plate
    // Input: 1 silver_ingot
    // Output: 1 silver_plate
    event.recipes.create.pressing(
        'ftbmaterials:silver_plate',
        'ftbmaterials:silver_ingot'
    )
})
