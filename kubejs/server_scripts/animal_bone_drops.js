// Inventors Modpack - Animal Bone Drops
// Adds 1 to 2 bones to animal drops via LootJS

LootJS.modifiers((event) => {
    event
        .addEntityModifier('#minecraft:animals')
        .addLoot(LootEntry.of('minecraft:bone').limitCount(1, 2));
});
