// Disable crusty_chunks ore generation and add AllTheOres worldgen

WorldgenEvents.remove(event => {
    event.removeOres(ores => {
        ores.blocks = [
            'crusty_chunks:lead_ore',
            'crusty_chunks:deepslate_lead_ore',
            'crusty_chunks:nickel_ore',
            'crusty_chunks:deepslate_nickel_ore',
            'crusty_chunks:zinc_ore',
            'crusty_chunks:deepslate_zinc_ore',
            'crusty_chunks:uranium_ore',
            'crusty_chunks:deepslate_uranium_ore'
        ]
    })
})
