// Tag modifications - add items to tags

ServerEvents.tags('item', event => {
    // Firstworks owns the hide chain; vanilla leather is the finished product.
    event.add('c:leathers', 'minecraft:leather')
    event.add('firstworks:raw_hides', 'naturalist:hide')
    event.add('kubejs:raw_hides', 'firstworks:raw_hide')
    // Naturalist's hide is an untanned hide, so it enters the Firstworks
    // tanning chain instead of being smelted straight into finished leather.
    event.add('kubejs:raw_hides', 'naturalist:hide')
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
    event.add('kubejs:coal_dusts', 'firstworks:charcoal_powder')

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

// Pack-owned extensions to Firstworks' generic animal-material rules.
// Lists are explicit so new or changed modded mobs do not silently acquire
// anatomically inappropriate bones or hides.
ServerEvents.tags('entity_type', event => {
    event.add('firstworks:drops_bones', [
        'aquaculture:arapaima',
        'aquaculture:arrau_turtle',
        'aquaculture:atlantic_cod',
        'aquaculture:atlantic_halibut',
        'aquaculture:atlantic_herring',
        'aquaculture:bayad',
        'aquaculture:blackfish',
        'aquaculture:bluegill',
        'aquaculture:boulti',
        'aquaculture:box_turtle',
        'aquaculture:brown_shrooma',
        'aquaculture:brown_trout',
        'aquaculture:capitaine',
        'aquaculture:carp',
        'aquaculture:catfish',
        'aquaculture:gar',
        'aquaculture:minnow',
        'aquaculture:muskellunge',
        'aquaculture:pacific_halibut',
        'aquaculture:perch',
        'aquaculture:pink_salmon',
        'aquaculture:piranha',
        'aquaculture:pollock',
        'aquaculture:rainbow_trout',
        'aquaculture:red_grouper',
        'aquaculture:red_shrooma',
        'aquaculture:smallmouth_bass',
        'aquaculture:starshell_turtle',
        'aquaculture:synodontis',
        'aquaculture:tambaqui',
        'aquaculture:tuna'
    ])

    event.add('firstworks:no_bone_drops', 'aquaculture:jellyfish')

    // Naturalist vertebrates. This deliberately includes fish, reptiles and
    // birds, but excludes every invertebrate and the detachable lizard tail.
    event.add('firstworks:drops_bones', [
        'naturalist:alligator',
        'naturalist:anglerfish',
        'naturalist:bass',
        'naturalist:bear',
        'naturalist:bird',
        'naturalist:black_bear',
        'naturalist:blobfish',
        'naturalist:boar',
        'naturalist:capybara',
        'naturalist:catfish',
        'naturalist:deer',
        'naturalist:duck',
        'naturalist:elephant',
        'naturalist:forest_fox',
        'naturalist:forest_rabbit',
        'naturalist:giraffe',
        'naturalist:great_white_shark',
        'naturalist:hedgehog',
        'naturalist:hippo',
        'naturalist:komodo_dragon',
        'naturalist:lion',
        'naturalist:lizard',
        'naturalist:mammoth',
        'naturalist:mole',
        'naturalist:ostrich',
        'naturalist:piranha',
        'naturalist:rat',
        'naturalist:ray',
        'naturalist:rhino',
        'naturalist:snake',
        'naturalist:tiger',
        'naturalist:tortoise',
        'naturalist:turkey',
        'naturalist:vulture',
        'naturalist:whale',
        'naturalist:zebra'
    ])

    event.add('firstworks:no_bone_drops', [
        'naturalist:ant',
        'naturalist:butterfly',
        'naturalist:caterpillar',
        'naturalist:clam',
        'naturalist:crab',
        'naturalist:desert_scorpion',
        'naturalist:dragonfly',
        'naturalist:firefly',
        'naturalist:giant_isopod',
        'naturalist:jellyfish',
        'naturalist:jungle_scorpion',
        'naturalist:lizard_tail',
        'naturalist:snail',
        'naturalist:starfish'
    ])

    // Deer and zebra drop vanilla leather, which Firstworks replaces with raw
    // hide. The other entries already drop naturalist:hide; tagging them keeps
    // the intended classification explicit if their upstream loot changes.
    event.add('firstworks:leather_drops_as_raw_hide', [
        'naturalist:boar',
        'naturalist:deer',
        'naturalist:elephant',
        'naturalist:komodo_dragon',
        'naturalist:rhino',
        'naturalist:zebra'
    ])

    event.add('firstworks:no_raw_hide_drops', [
        'naturalist:alligator',
        'naturalist:anglerfish',
        'naturalist:ant',
        'naturalist:bass',
        'naturalist:bear',
        'naturalist:bird',
        'naturalist:black_bear',
        'naturalist:blobfish',
        'naturalist:butterfly',
        'naturalist:capybara',
        'naturalist:caterpillar',
        'naturalist:catfish',
        'naturalist:clam',
        'naturalist:crab',
        'naturalist:desert_scorpion',
        'naturalist:dragonfly',
        'naturalist:duck',
        'naturalist:firefly',
        'naturalist:forest_fox',
        'naturalist:forest_rabbit',
        'naturalist:giant_isopod',
        'naturalist:giraffe',
        'naturalist:great_white_shark',
        'naturalist:hedgehog',
        'naturalist:hippo',
        'naturalist:jellyfish',
        'naturalist:jungle_scorpion',
        'naturalist:lion',
        'naturalist:lizard',
        'naturalist:lizard_tail',
        'naturalist:mammoth',
        'naturalist:mole',
        'naturalist:ostrich',
        'naturalist:piranha',
        'naturalist:rat',
        'naturalist:ray',
        'naturalist:snail',
        'naturalist:snake',
        'naturalist:starfish',
        'naturalist:tiger',
        'naturalist:tortoise',
        'naturalist:turkey',
        'naturalist:vulture',
        'naturalist:whale'
    ])
})
