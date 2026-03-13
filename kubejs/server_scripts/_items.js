// Item ID Variables - change these in one place to update all recipes
// This file loads first (underscore prefix) and makes ITEMS available to all scripts
// Only add items that are used in multiple places or have variants

global.ITEMS = {
    // Vanilla ores (keep as specific items)
    raw_iron: 'minecraft:raw_iron',
    raw_copper: 'minecraft:raw_copper',
    raw_gold: 'minecraft:raw_gold',
    
    // Create/modded ores - use tags for compatibility
    raw_zinc: '#forge:raw_materials/zinc',
    raw_nickel: '#forge:raw_materials/nickel',
    raw_aluminum: '#forge:raw_materials/aluminum',
    raw_lead: '#forge:raw_materials/lead',
    
    // Crushed ores (outputs) - all from Create mod
    crushed_iron: 'create:crushed_raw_iron',
    crushed_copper: 'create:crushed_raw_copper',
    crushed_gold: 'create:crushed_raw_gold',
    crushed_zinc: 'create:crushed_raw_zinc',
    crushed_nickel: 'create:crushed_raw_nickel',
    crushed_aluminum: 'create:crushed_raw_aluminum',
    crushed_lead: 'create:crushed_raw_lead',
    crushed_silver: 'create:crushed_raw_silver',
    
    // Ingots - FTB Materials
    iron_ingot: 'minecraft:iron_ingot',
    nickel_ingot: 'ftbmaterials:nickel_ingot',
    silver_ingot: 'ftbmaterials:silver_ingot',
    invar_ingot: 'ftbmaterials:invar_ingot',
    lead_ingot: 'ftbmaterials:lead_ingot',
    
    // Dusts - FTB Materials
    iron_dust: 'ftbmaterials:iron_dust',
    nickel_dust: 'ftbmaterials:nickel_dust',
    invar_dust: 'ftbmaterials:invar_dust',
    
    // Other
    experience_nugget: 'create:experience_nugget'
}
