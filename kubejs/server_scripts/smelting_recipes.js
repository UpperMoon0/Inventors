// Smelting recipes for crushed ores and dusts

ServerEvents.recipes(event => {
    // Remove existing smelting recipes that output creatingspace:nickel_ingot
    event.remove({ output: 'creatingspace:nickel_ingot', type: 'minecraft:smelting' })
    event.remove({ output: 'creatingspace:nickel_ingot', type: 'minecraft:blasting' })
    
    // Remove existing smelting recipes that output crusty_chunks:lead_ingot
    event.remove({ output: 'crusty_chunks:lead_ingot', type: 'minecraft:smelting' })
    event.remove({ output: 'crusty_chunks:lead_ingot', type: 'minecraft:blasting' })
    
    // Remove existing smelting recipes that output ftbmaterials:lead_ingot
    event.remove({ id: 'ftbmaterials:lead_ingot_from_smelting_lead_raw_ore' })
    event.remove({ id: 'ftbmaterials:lead_ingot_from_blasting_lead_raw_ore' })

    // ========================================
    // Crushed Ore Smelting
    // ========================================
    
    // Crushed Silver -> Silver Ingot
    // Input: 1 create:crushed_raw_silver
    // Output: 1 ftbmaterials:silver_ingot
    // XP: 0.7 (same as iron)
    event.smelting(global.ITEMS.silver_ingot, global.ITEMS.crushed_silver).xp(0.7)
    event.blasting(global.ITEMS.silver_ingot, global.ITEMS.crushed_silver).xp(0.5)
    
    // Crushed Nickel -> Nickel Ingot (FTB Materials)
    // Input: 1 create:crushed_raw_nickel
    // Output: 1 ftbmaterials:nickel_ingot
    // XP: 0.7 (same as iron)
    event.smelting(global.ITEMS.nickel_ingot, global.ITEMS.crushed_nickel).xp(0.7)
    event.blasting(global.ITEMS.nickel_ingot, global.ITEMS.crushed_nickel).xp(0.5)
    
    // Crushed Lead -> Lead Ingot (FTB Materials)
    // Input: 1 create:crushed_raw_lead
    // Output: 1 ftbmaterials:lead_ingot
    // XP: 0.7 (same as iron)
    event.smelting(global.ITEMS.lead_ingot, global.ITEMS.crushed_lead).xp(0.7)
    event.blasting(global.ITEMS.lead_ingot, global.ITEMS.crushed_lead).xp(0.5)
    
    // Raw Lead -> Lead Ingot (FTB Materials)
    // Input: 1 #forge:raw_materials/lead
    // Output: 1 ftbmaterials:lead_ingot
    // XP: 1.0 (same as raw iron)
    event.smelting(global.ITEMS.lead_ingot, global.ITEMS.raw_lead).xp(1.0)
    event.blasting(global.ITEMS.lead_ingot, global.ITEMS.raw_lead).xp(0.7)
    
    // Raw Nickel -> Nickel Ingot (FTB Materials)
    // Input: 1 #forge:raw_materials/nickel
    // Output: 1 ftbmaterials:nickel_ingot
    // XP: 1.0 (same as raw iron)
    event.smelting(global.ITEMS.nickel_ingot, global.ITEMS.raw_nickel).xp(1.0)
    event.blasting(global.ITEMS.nickel_ingot, global.ITEMS.raw_nickel).xp(0.7)
    
    // ========================================
    // Dust Smelting
    // ========================================
    
    // Invar Dust -> Invar Ingot
    // Input: 1 ftbmaterials:invar_dust
    // Output: 1 ftbmaterials:invar_ingot
    // XP: 0.7 (same as iron)
    event.smelting(global.ITEMS.invar_ingot, global.ITEMS.invar_dust).xp(0.7)
    event.blasting(global.ITEMS.invar_ingot, global.ITEMS.invar_dust).xp(0.5)
})
