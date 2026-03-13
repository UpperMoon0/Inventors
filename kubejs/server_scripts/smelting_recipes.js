// Smelting recipes for crushed ores

ServerEvents.recipes(event => {
    // Crushed Silver -> Silver Ingot
    // Input: 1 create:crushed_raw_silver
    // Output: 1 ftbmaterials:silver_ingot
    // XP: 0.7 (same as iron)
    event.smelting(global.ITEMS.silver_ingot, global.ITEMS.crushed_silver).xp(0.7)
    
    // Blast furnace version (faster, less XP)
    event.blasting(global.ITEMS.silver_ingot, global.ITEMS.crushed_silver).xp(0.5)
})
