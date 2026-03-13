// Standard crafting table recipes
// For shaped/shapeless crafting recipes (not Create mod machines)

ServerEvents.recipes(event => {
    // Remove original Andesite Alloy crafting recipes and replace with new one using Invar and Stone
    event.remove({ id: 'create:crafting/materials/andesite_alloy' })
    event.remove({ id: 'create:crafting/materials/andesite_alloy_from_zinc' })
    event.shaped('create:andesite_alloy', [
        'NS',
        'SN'
    ], {
        N: '#kubejs:andesite_nugget',
        S: '#forge:stone'
    })

    // Remove original Electron Tube crafting recipe and replace with new one using Silver Plates
    event.remove({ id: 'create:crafting/materials/electron_tube' })
    event.shaped('create:electron_tube', [
        'R',
        'S'
    ], {
        R: 'create:polished_rose_quartz',
        S: 'ftbmaterials:silver_plate'
    })
})
