// Inventors keeps fire-side leather drying available during the primitive age.
// Firstworks itself uses a furnace so standalone installations retain a familiar default.

ServerEvents.recipes(event => {
    // Naturalist otherwise lets raw hide skip the full primitive tanning chain
    // by smelting directly into leather.
    event.remove({ id: 'naturalist:leather_from_smelting_hide' })

    event.custom({
        type: 'minecraft:campfire_cooking',
        category: 'misc',
        ingredient: { item: 'firstworks:tannin_soaked_hide' },
        result: { id: 'minecraft:leather' },
        experience: 0.1,
        cookingtime: 600
    }).id('kubejs:leather/campfire_drying')
})
