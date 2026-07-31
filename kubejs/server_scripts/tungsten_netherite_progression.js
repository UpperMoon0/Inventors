// Ancient Debris is the pack's tungsten source. Netherite is a cast
// tungsten-titanium-gold alloy, not a scrap crafting recipe.

ServerEvents.recipes(event => {
    event.remove({ output: 'minecraft:netherite_scrap' })
    event.remove({ id: 'minecraft:netherite_ingot' })

    const obsoleteFoundryRoutes = [
        'productivemetalworks:melting/ancient_debris',
        'productivemetalworks:melting/geore/ancient_debris_block',
        'productivemetalworks:melting/geore/ancient_debris_shard',
        'productivemetalworks:melting/netherite_scrap',
        'productivemetalworks:casting/netherite_scrap',
        'productivemetalworks:alloying/molten_netherite'
    ]

    obsoleteFoundryRoutes.forEach(id => event.remove({ id: id }))
})
