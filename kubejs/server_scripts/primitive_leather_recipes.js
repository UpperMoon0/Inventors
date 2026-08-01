// Inventors keeps fire-side leather drying available during the primitive age.
// Firstworks itself uses a furnace so standalone installations retain a familiar default.

ServerEvents.recipes(event => {
    event.custom({
        type: 'minecraft:campfire_cooking',
        category: 'misc',
        ingredient: { item: 'firstworks:tannin_soaked_hide' },
        result: { id: 'minecraft:leather' },
        experience: 0.1,
        cookingtime: 600
    }).id('kubejs:leather/campfire_drying')
})
