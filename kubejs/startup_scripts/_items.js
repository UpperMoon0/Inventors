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
    tungsten_dirty_dust: 'ftbmaterials:tungsten_dirty_dust',
    tungsten_dust: 'ftbmaterials:tungsten_dust',
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
    tungsten_ingot: 'ftbmaterials:tungsten_ingot',
    bronze_ingot: 'ftbmaterials:bronze_ingot',
    brass_ingot: 'create:brass_ingot',
    iron_dust: 'ftbmaterials:iron_dust',
    iron_concentrate: 'kubejs:iron_concentrate',
    bloomery_charge: 'kubejs:bloomery_charge',
    iron_bloom: 'kubejs:iron_bloom',
    worked_iron_bloom: 'kubejs:worked_iron_bloom',
    wrought_iron_billet: 'kubejs:wrought_iron_billet',
    sealed_coke_charge: 'kubejs:sealed_coke_charge',
    metallurgical_coke: 'kubejs:metallurgical_coke',
    green_biocoke: 'kubejs:green_biocoke',
    dense_biocoke: 'kubejs:dense_biocoke',
    titanium_catalyst_mesh: 'kubejs:titanium_catalyst_mesh',
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

StartupEvents.registry('item', event => {
    event.create('iron_concentrate').displayName('Washed Iron Concentrate').texture('create:item/crushed_raw_iron')
    event.create('bloomery_charge').displayName('Bloomery Charge').texture('minecraft:item/charcoal')
    event.create('iron_bloom').displayName('Iron Bloom').texture('minecraft:item/raw_iron')
    event.create('worked_iron_bloom').displayName('Worked Iron Bloom').texture('minecraft:item/raw_iron')
    event.create('wrought_iron_billet').displayName('Wrought Iron Billet').texture('minecraft:item/iron_ingot')
    event.create('sealed_coke_charge').displayName('Sealed Coke Charge').texture('minecraft:item/clay_ball')
    event.create('metallurgical_coke').displayName('Metallurgical Coke').texture('minecraft:item/coal')
    event.create('green_biocoke').displayName('Green Biocoke Briquette').texture('minecraft:item/charcoal')
    event.create('dense_biocoke').displayName('Dense Biocoke').texture('minecraft:item/coal')
    event.create('titanium_catalyst_mesh').displayName('Titanium Catalyst Mesh').texture('minecraft:block/iron_bars')
    event.create('unfired_storage_pot').displayName('Unfired Storage Pot')
    event.create('drying_frame').displayName('Primitive Drying Frame')
    event.create('dried_meat').displayName('Dried Meat').food(5, 0.6)
    event.create('dried_fish').displayName('Dried Fish').food(4, 0.5)
    event.create('dried_berries').displayName('Dried Berries').food(3, 0.4)
})
