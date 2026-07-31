// Create Splashing recipes

ServerEvents.recipes(event => {
    event.remove({ id: 'create:splashing/crushed_raw_iron' })
    event.remove({ id: 'rocketnautics:splashing/crushed_raw_titanium' })

    // Iron is washed into a clean concentrate instead of becoming nuggets.
    event.recipes.create.splashing(
        'kubejs:iron_concentrate',
        'create:crushed_raw_iron'
    ).id('kubejs:iron/wash_concentrate')

    event.recipes.create.splashing(
        'ftbmaterials:tungsten_dust',
        'ftbmaterials:tungsten_dirty_dust'
    ).id('kubejs:tungsten/wash_dirty_dust')

    // Cosmonautics formerly produced obsolete Netherite Scrap here. Preserve
    // its titanium washing route without leaking the removed scrap progression.
    event.recipes.create.splashing(
        '9x rocketnautics:titanium_nugget',
        'rocketnautics:crushed_raw_titanium'
    ).id('kubejs:compat/wash_cosmonautics_titanium')
})
