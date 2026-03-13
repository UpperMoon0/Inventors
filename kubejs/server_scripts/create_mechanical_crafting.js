// Create Mechanical Crafting recipes

ServerEvents.recipes(event => {
    // Remove original crushing wheel recipe
    event.remove({ output: 'create:crushing_wheel' })
    
    // Crushing Wheel - Custom recipe using Invar and Lead
    // Pattern:
    //  III
    // IILII
    // ILSLI
    // IILII
    //  III
    // I: invar_ingot
    // L: lead_ingot
    // S: #forge:stone
    event.recipes.create.mechanical_crafting('create:crushing_wheel', [
        ' III ',
        'IILII',
        'ILSLI',
        'IILII',
        ' III '
    ], {
        I: global.ITEMS.invar_ingot,
        L: global.ITEMS.bronze_ingot,
        S: 'ftbmaterials:lead_block'
    })
})
