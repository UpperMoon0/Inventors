// Smelting recipes for crushed ores and dusts

ServerEvents.recipes(event => {
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
    
    // ========================================
    // Dust Smelting
    // ========================================
    
    // Invar Dust -> Invar Ingot
    event.smelting(global.ITEMS.invar_ingot, global.ITEMS.invar_dust).xp(0.7)
    event.blasting(global.ITEMS.invar_ingot, global.ITEMS.invar_dust).xp(0.5)

    // Copper Dust -> Copper Ingot
    event.smelting(global.ITEMS.copper_ingot, global.ITEMS.copper_dust).xp(0.7)
    event.blasting(global.ITEMS.copper_ingot, global.ITEMS.copper_dust).xp(0.5)

    // Tin Dust -> Tin Ingot
    event.smelting(global.ITEMS.tin_ingot, global.ITEMS.tin_dust).xp(0.7)
    event.blasting(global.ITEMS.tin_ingot, global.ITEMS.tin_dust).xp(0.5)

    // Nickel Dust -> Nickel Ingot
    event.smelting(global.ITEMS.nickel_ingot, global.ITEMS.nickel_dust).xp(0.7)
    event.blasting(global.ITEMS.nickel_ingot, global.ITEMS.nickel_dust).xp(0.5)

    // Iron Dust -> Iron Ingot
    event.smelting(global.ITEMS.iron_ingot, global.ITEMS.iron_dust).xp(0.7)
    event.blasting(global.ITEMS.iron_ingot, global.ITEMS.iron_dust).xp(0.5)

    // Bronze Dust -> Bronze Ingot
    event.smelting(global.ITEMS.bronze_ingot, global.ITEMS.bronze_dust).xp(0.7)
    event.blasting(global.ITEMS.bronze_ingot, global.ITEMS.bronze_dust).xp(0.5)

    // Invar Dust -> Invar Ingot
    event.smelting(global.ITEMS.invar_ingot, global.ITEMS.invar_dust).xp(0.7)
    event.blasting(global.ITEMS.invar_ingot, global.ITEMS.invar_dust).xp(0.5)

    // Brass Dust -> Brass Ingot
    event.smelting(global.ITEMS.brass_ingot, global.ITEMS.brass_dust).xp(0.7)
    event.blasting(global.ITEMS.brass_ingot, global.ITEMS.brass_dust).xp(0.5)

    // Zinc Dust -> Zinc Ingot
    event.smelting(global.ITEMS.zinc_ingot, global.ITEMS.zinc_dust).xp(0.7)
    event.blasting(global.ITEMS.zinc_ingot, global.ITEMS.zinc_dust).xp(0.5)
})
