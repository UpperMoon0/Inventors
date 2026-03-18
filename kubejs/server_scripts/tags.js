// Tag modifications - add items to tags

ServerEvents.tags('item', event => {
    // Create unified tags for iron (dust or ingot)
    event.add('kubejs:iron_material', '#forge:ingots/iron')
    event.add('kubejs:iron_material', '#forge:dusts/iron')
    
    // Create unified tags for nickel (dust or ingot)
    event.add('kubejs:nickel_material', '#forge:ingots/nickel')
    event.add('kubejs:nickel_material', '#forge:dusts/nickel')
    
    // Create unified tags for copper (dust or ingot)
    event.add('kubejs:copper_material', '#forge:ingots/copper')
    event.add('kubejs:copper_material', '#forge:dusts/copper')
    
    // Create unified tags for tin (dust or ingot)
    event.add('kubejs:tin_material', '#forge:ingots/tin')
    event.add('kubejs:tin_material', '#forge:dusts/tin')
    
    // Create unified tag for nuggets used in Andesite Alloy (iron or zinc)
    event.add('kubejs:andesite_nugget', '#forge:nuggets/iron')
    event.add('kubejs:andesite_nugget', '#forge:nuggets/zinc')

    // Create unified tag for coal/charcoal (carbon source for ore processing)
    event.add('kubejs:carbon_source', 'minecraft:coal')
    event.add('kubejs:carbon_source', 'minecraft:charcoal')

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
