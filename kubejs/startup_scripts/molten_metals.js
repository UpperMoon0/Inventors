// Productive Metalworks does not register these FTB Materials metals itself.
// Add their molten forms so they can participate in the custom foundry loops.
StartupEvents.registry('fluid', event => {
    event.create('molten_titanium', 'thick')
        .displayName('Molten Titanium')
        .tint(0xB9C7D5)
        .tag('c:molten_titanium')

    event.create('molten_tungsten', 'thick')
        .displayName('Molten Tungsten')
        .tint(0x59636B)
        .tag('c:molten_tungsten')

    event.create('wood_tar', 'thick')
        .displayName('Wood Tar')
        .tint(0x352015)
        .tag('c:wood_tar')
})
