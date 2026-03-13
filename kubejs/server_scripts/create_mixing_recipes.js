// Create Mixing recipes for alloys

ServerEvents.recipes(event => {
    // Invar Dust Mixing
    // Input: 2 iron_dust + 1 nickel_dust
    // Output: 3 invar_dust
    // Requires: Heated (standard mixer with blaze burner)
    event.recipes.create.mixing(
        Item.of(`3x ${global.ITEMS.invar_dust}`),
        [
            Item.of(`2x ${global.ITEMS.iron_dust}`),
            Item.of(global.ITEMS.nickel_dust)
        ]
    ).heated()
})
