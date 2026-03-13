// Tag modifications - add items to tags

ServerEvents.tags('item', event => {
    // Add Creating Space raw nickel to the forge raw_materials/nickel tag
    event.add('forge:raw_materials/nickel', 'creatingspace:raw_nickel')
})
