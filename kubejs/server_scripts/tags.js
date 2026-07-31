// Tag modifications - add items to tags

ServerEvents.tags('item', event => {
    // Only processed hide counts as usable leather. Mob drops remain raw hide.
    event.remove('c:leathers', 'minecraft:leather')
    event.add('c:leathers', 'kubejs:tanned_leather')
    event.add('kubejs:raw_hides', 'minecraft:leather')
    event.add('kubejs:dried_foods', 'kubejs:dried_meat')
    event.add('kubejs:dried_foods', 'kubejs:dried_fish')
    event.add('kubejs:dried_foods', 'kubejs:dried_berries')

    // Early wooden structures accept either rough improvised panels or any
    // conventional plank supplied by vanilla or another mod.
    event.add('kubejs:primitive_planks', '#minecraft:planks')
    event.add('kubejs:primitive_planks', 'primitivestart:improvised_planks')

    // Create unified tags for iron (dust or ingot)
    event.add('kubejs:iron_material', 'ftbmaterials:iron_dust')
    event.add('kubejs:iron_material', 'minecraft:iron_ingot')

    // Create unified tags for nickel (dust or ingot)
    event.add('kubejs:nickel_material', 'ftbmaterials:nickel_ingot')
    event.add('kubejs:nickel_material', 'ftbmaterials:nickel_dust')

    // Create unified tags for copper (dust or ingot)
    event.add('kubejs:copper_material', 'minecraft:copper_ingot')
    event.add('kubejs:copper_material', 'ftbmaterials:copper_dust')

    // Create unified tags for tin (dust or ingot)
    event.add('kubejs:tin_material', 'ftbmaterials:tin_ingot')
    event.add('kubejs:tin_material', 'ftbmaterials:tin_dust')

    // Create unified tag for nuggets used in Andesite Alloy (iron or zinc)
    event.add('kubejs:andesite_alloy_nugget_ingredients', 'minecraft:iron_nugget')
    event.add('kubejs:andesite_alloy_nugget_ingredients', 'create:zinc_nugget')

    // Create unified tag for coal/charcoal (carbon source for ore processing)
    event.add('kubejs:carbon_source', 'minecraft:coal')
    event.add('kubejs:carbon_source', 'minecraft:charcoal')

    // Coal dusts tag for steel production
    event.add('kubejs:coal_dusts', 'ftbmaterials:coal_dust')
    event.add('kubejs:coal_dusts', 'ftbmaterials:charcoal_dust')

    // ========== CREATE TIERS TAGS ==========
    // All cogwheels across all tiers (including default Create)
    event.add('kubejs:cogwheel', 'createtiers:cogwheel_crude')
    event.add('kubejs:cogwheel', 'createtiers:cogwheel_basic')
    event.add('kubejs:cogwheel', 'createtiers:cogwheel_refined')

    // All shafts across all tiers (including default Create)
    event.add('kubejs:shaft', 'createtiers:shaft_crude')
    event.add('kubejs:shaft', 'createtiers:shaft_basic')
    event.add('kubejs:shaft', 'createtiers:shaft_refined')

    // All large cogwheels across all tiers (including default Create)
    event.add('kubejs:large_cogwheel', 'createtiers:large_cogwheel_crude')
    event.add('kubejs:large_cogwheel', 'createtiers:large_cogwheel_basic')
    event.add('kubejs:large_cogwheel', 'createtiers:large_cogwheel_refined')
})
