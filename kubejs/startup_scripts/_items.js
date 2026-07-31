// Item ID Variables - change these in one place to update all recipes
// Only add items that are used in multiple places or have variants

global.ITEMS = {
    raw_iron: 'minecraft:raw_iron',
    raw_copper: 'minecraft:raw_copper',
    raw_gold: 'minecraft:raw_gold',
    raw_zinc: 'ftbmaterials:zinc_raw_ore',
    raw_nickel: 'ftbmaterials:nickel_raw_ore',
    raw_aluminum: 'ftbmaterials:aluminum_raw_ore',
    raw_lead: 'ftbmaterials:lead_raw_ore',
    raw_silver: 'ftbmaterials:silver_raw_ore',
    raw_uranium: 'ftbmaterials:uranium_raw_ore',
    raw_tin: 'ftbmaterials:tin_raw_ore',
    raw_titanium: 'ftbmaterials:titanium_raw_ore',
    crushed_iron: 'create:crushed_raw_iron',
    crushed_copper: 'create:crushed_raw_copper',
    crushed_gold: 'create:crushed_raw_gold',
    crushed_zinc: 'create:crushed_raw_zinc',
    crushed_nickel: 'create:crushed_raw_nickel',
    crushed_aluminum: 'create:crushed_raw_aluminum',
    crushed_lead: 'create:crushed_raw_lead',
    crushed_silver: 'create:crushed_raw_silver',
    crushed_uranium: 'create:crushed_raw_uranium',
    crushed_tin: 'create:crushed_raw_tin',
    iron_ingot: 'minecraft:iron_ingot',
    copper_ingot: 'minecraft:copper_ingot',
    zinc_ingot: 'create:zinc_ingot',
    nickel_ingot: 'ftbmaterials:nickel_ingot',
    tin_ingot: 'ftbmaterials:tin_ingot',
    silver_ingot: 'ftbmaterials:silver_ingot',
    invar_ingot: 'ftbmaterials:invar_ingot',
    invar_nugget: 'ftbmaterials:invar_nugget',
    lead_ingot: 'ftbmaterials:lead_ingot',
    uranium_ingot: 'ftbmaterials:uranium_ingot',
    titanium_ingot: 'ftbmaterials:titanium_ingot',
    titanium_plate: 'ftbmaterials:titanium_plate',
    bronze_ingot: 'ftbmaterials:bronze_ingot',
    brass_ingot: 'create:brass_ingot',
    iron_dust: 'ftbmaterials:iron_dust',
    nickel_dust: 'ftbmaterials:nickel_dust',
    invar_dust: 'ftbmaterials:invar_dust',
    silver_dust: 'ftbmaterials:silver_dust',
    uranium_dust: 'ftbmaterials:uranium_dust',
    copper_dust: 'ftbmaterials:copper_dust',
    tin_dust: 'ftbmaterials:tin_dust',
    lead_dust: 'ftbmaterials:lead_dust',
    zinc_dust: 'ftbmaterials:zinc_dust',
    bronze_dust: 'ftbmaterials:bronze_dust',
    brass_dust: 'ftbmaterials:brass_dust',
    graphite_dust: 'ftbmaterials:graphite_dust',
    coal_dust: 'ftbmaterials:coal_dust',
    charcoal_dust: 'ftbmaterials:charcoal_dust',
    iron_nugget: 'ftbmaterials:iron_nugget',
    steel_nugget: 'ftbmaterials:steel_nugget',
    experience_nugget: 'create:experience_nugget'
}

// Primitive tanning materials. Vanilla leather drops are treated as raw hide;
// these items represent the processing stages required for usable leather.
StartupEvents.registry('item', event => {
    event.create('tree_bark').displayName('Tree Bark')
    event.create('soaked_hide').displayName('Soaked Hide')
    event.create('scraped_hide').displayName('Scraped Hide')
    event.create('tannin_soaked_hide').displayName('Tannin-Soaked Hide')
    event.create('tanned_leather').displayName('Leather')
})
