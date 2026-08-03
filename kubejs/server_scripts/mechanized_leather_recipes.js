// Crude Create machinery turns the manual tanning chain into a continuous line.
// It automates Firstworks' physical barrel process once Create is available.

ServerEvents.recipes(event => {
    event.recipes.create.splashing(
        'firstworks:soaked_hide',
        Ingredient.of('#kubejs:raw_hides')
    ).id('kubejs:leather/mechanical_washing')

    event.recipes.create.cutting(
        'firstworks:scraped_hide',
        'firstworks:soaked_hide'
    ).id('kubejs:leather/mechanical_scraping')

    event.recipes.create.mixing(Fluid.of('firstworks:tannin_solution', 1000), [
        '4x firstworks:tree_bark',
        Fluid.of('minecraft:water', 1000)
    ]).id('kubejs:leather/mechanical_tannin_brewing')

    event.recipes.create.mixing('firstworks:tannin_soaked_hide', [
        'firstworks:scraped_hide',
        Fluid.of('firstworks:tannin_solution', 250)
    ]).id('kubejs:leather/mechanical_tanning')

    event.recipes.create.pressing(
        'minecraft:leather',
        'firstworks:tannin_soaked_hide'
    ).id('kubejs:leather/mechanical_finishing')
})
