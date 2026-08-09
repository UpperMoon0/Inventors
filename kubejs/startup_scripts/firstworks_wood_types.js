// Generate native Firstworks loom and barrel variants for every complete
// Regions Unexplored wood family. Startup registry changes require a restart.
StartupEvents.registry('block', event => {
    const treeWoods = [
        'baobab',
        'blackwood',
        'brimwood',
        'cobalt',
        'cypress',
        'dead',
        'eucalyptus',
        'joshua',
        'kapok',
        'larch',
        'magnolia',
        'maple',
        'palm',
        'pine',
        'redwood',
        'socotra',
        'willow',
        'wisteria'
    ]

    treeWoods.forEach(wood => {
        Firstworks.registerWoodType(event, `kubejs:ru_${wood}`, {
            planks: `regions_unexplored:${wood}_planks`,
            slab: `regions_unexplored:${wood}_slab`,
            log: `regions_unexplored:${wood}_log`,
            strippedLog: `regions_unexplored:stripped_${wood}_log`,
            displayName: wood.charAt(0).toUpperCase() + wood.slice(1)
        })
    })

    // Alpha's registry names use "alpha", but its textures use "alpha_oak".
    Firstworks.registerWoodType(event, 'kubejs:ru_alpha', {
        planks: 'regions_unexplored:alpha_planks',
        slab: 'regions_unexplored:alpha_slab',
        log: 'regions_unexplored:alpha_log',
        strippedLog: 'regions_unexplored:alpha_log',
        plankTexture: 'regions_unexplored:block/alpha_oak_planks',
        logTexture: 'regions_unexplored:block/alpha_oak_log',
        logTopTexture: 'regions_unexplored:block/alpha_oak_log_top',
        strippedLogTexture: 'regions_unexplored:block/alpha_oak_log',
        displayName: 'Alpha'
    })

    const bioshroomWoods = ['blue', 'green', 'pink', 'yellow']

    bioshroomWoods.forEach(color => {
        const wood = `${color}_bioshroom`
        Firstworks.registerWoodType(event, `kubejs:ru_${wood}`, {
            planks: `regions_unexplored:${wood}_planks`,
            slab: `regions_unexplored:${wood}_slab`,
            log: `regions_unexplored:${wood}_stem`,
            strippedLog: `regions_unexplored:stripped_${wood}_stem`,
            displayName: `${color.charAt(0).toUpperCase() + color.slice(1)} Bioshroom`
        })
    })
})
