// Productive Metalworks does not register titanium itself. Add the missing
// molten form so FTB Materials titanium can participate in the foundry loop.
StartupEvents.registry('fluid', event => {
    event.create('molten_titanium', 'thick')
        .displayName('Molten Titanium')
        .tint(0xB9C7D5)
        .tag('c:molten_titanium')
})
