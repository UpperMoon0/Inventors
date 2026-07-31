// Carbon for steel must come from superheated metallurgical coke. Ordinary coal,
// charcoal and ore cannot be poured straight into the foundry as molten carbon.

ServerEvents.recipes(event => {
    const unrestrictedCarbonMelting = [
        'productivemetalworks:melting/coals',
        'productivemetalworks:melting/geore/coal_block',
        'productivemetalworks:melting/geore/coal_shard',
        'productivemetalworks:melting/ores/coals',
        'productivemetalworks:melting/storage_blocks/charcoals',
        'productivemetalworks:melting/storage_blocks/coals'
    ]

    unrestrictedCarbonMelting.forEach(id => event.remove({ id: id }))
})
