// Tag modifications - add items to tags

ServerEvents.tags('item', event => {
    // Firstworks owns the hide chain; vanilla leather is the finished product.
    event.add('c:leathers', 'minecraft:leather')
    event.add('kubejs:raw_hides', 'firstworks:raw_hide')
    event.add('kubejs:dried_foods', 'kubejs:dried_meat')
    event.add('kubejs:dried_foods', 'kubejs:dried_fish')
    event.add('kubejs:dried_foods', 'kubejs:dried_berries')

    // Early wooden structures accept any conventional vanilla or modded plank.
    event.add('kubejs:primitive_planks', '#minecraft:planks')

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

// Vanilla passive animals that should leave bones when killed.
// A dedicated tag is used because Minecraft does not provide #minecraft:animals.
ServerEvents.tags('entity_type', event => {
    event.add('inventors:animals', [
        'minecraft:allay',
        'minecraft:armadillo',
        'minecraft:axolotl',
        'minecraft:bat',
        'minecraft:bee',
        'minecraft:camel',
        'minecraft:cat',
        'minecraft:chicken',
        'minecraft:cod',
        'minecraft:cow',
        'minecraft:dolphin',
        'minecraft:donkey',
        'minecraft:fox',
        'minecraft:frog',
        'minecraft:glow_squid',
        'minecraft:goat',
        'minecraft:horse',
        'minecraft:llama',
        'minecraft:mooshroom',
        'minecraft:mule',
        'minecraft:ocelot',
        'minecraft:panda',
        'minecraft:parrot',
        'minecraft:pig',
        'minecraft:polar_bear',
        'minecraft:pufferfish',
        'minecraft:rabbit',
        'minecraft:salmon',
        'minecraft:sheep',
        'minecraft:skeleton_horse',
        'minecraft:sniffer',
        'minecraft:squid',
        'minecraft:strider',
        'minecraft:tadpole',
        'minecraft:trader_llama',
        'minecraft:tropical_fish',
        'minecraft:turtle',
        'minecraft:wolf',
        'minecraft:zombie_horse'
    ])
})
