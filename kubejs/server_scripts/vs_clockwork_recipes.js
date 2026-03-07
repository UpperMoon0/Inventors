// Custom recipes for vs_clockwork items

ServerEvents.recipes(event => {
    // Physics Infuser recipe
    // Remove the original recipe
    event.remove({ output: 'vs_clockwork:physics_infuser' })
    
    // Add the new custom recipe
    // Pattern:
    // BSB
    // SES
    // BSB
    // B: create:brass_ingot
    // S: create:sturdy_sheet
    // E: minecraft:ender_pearl
    
    event.shaped('vs_clockwork:physics_infuser', [
        'BSB',
        'SES',
        'BSB'
    ], {
        B: 'create:brass_ingot',
        S: 'create:sturdy_sheet',
        E: 'minecraft:ender_pearl'
    })
    
    // Phys Bearing recipe
    // Remove the original recipe
    event.remove({ output: 'vs_clockwork:phys_bearing' })
    
    // Add the new custom recipe
    // Pattern:
    // T
    // C
    // B
    // T: create:turn_table
    // C: create:cogwheel
    // B: create:brass_casing
    
    event.shaped('vs_clockwork:phys_bearing', [
        'T',
        'C',
        'B'
    ], {
        T: 'create:turntable',
        C: 'create:cogwheel',
        B: 'create:brass_casing'
    })
})
