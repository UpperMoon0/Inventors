// Create Pressing recipes
// Pressing uses the Mechanical Press

ServerEvents.recipes(event => {
    // Silver Ingot -> Silver Plate
    // Input: 1 silver_ingot
    // Output: 1 silver_plate
    event.recipes.create.pressing(
        'ftbmaterials:silver_plate',
        '#forge:ingots/silver'
    )
})
