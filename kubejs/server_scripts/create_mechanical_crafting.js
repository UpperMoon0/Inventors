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
    // S: c:stones
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

    // Ender Eyes require an industrial steel frame and a precision mechanism.
    // Two eyes per assembly keeps a full portal expensive without being repetitive.
    event.remove({ id: 'minecraft:ender_eye' })
    event.recipes.create.mechanical_crafting('2x minecraft:ender_eye', [
        'SBS',
        'BEB',
        'SPS'
    ], {
        S: 'ftbmaterials:steel_plate',
        B: 'minecraft:blaze_powder',
        E: 'minecraft:ender_pearl',
        P: 'create:precision_mechanism'
    }).id('kubejs:steel/stabilized_ender_eyes')
})
