// Inventors 0.3.3 Stone -> Copper -> Bronze boundary.
// Firstworks owns primitive metalworking; Productive Metalworks starts at Bronze.
ServerEvents.recipes(event => {
  // Remove the old Copper-age vanilla utility substitutes. Firstworks now owns these tools.
  event.remove({ id: 'kubejs:copper/copper_shears' })
  event.remove({ id: 'kubejs:copper/copper_bucket' })

  // PMW fire clay is a Bronze material and consumes knowledge from the completed
  // Firstworks refractory + plaster loops. Remove every alternate recipe first.
  event.remove({ output: 'productivemetalworks:fire_clay' })
  event.shapeless(Item.of('productivemetalworks:fire_clay', 4), [
    'firstworks:refractory_clay',
    'firstworks:refractory_clay',
    'firstworks:plaster'
  ]).id('kubejs:bronze/fire_clay')

  // The mature foundry cannot bootstrap itself. Copper Fasteners require a
  // Firstworks worked-copper billet (cast -> annealed -> hammered), and the
  // fired crucible proves the advanced ceramic chain.
  event.remove({ output: 'productivemetalworks:black_foundry_controller' })
  event.shaped('productivemetalworks:black_foundry_controller', [
    'BBB',
    'FCF',
    'BBB'
  ], {
    B: 'productivemetalworks:black_fire_bricks',
    F: 'firstworks:copper_fasteners',
    C: 'firstworks:crucible'
  }).id('kubejs:bronze/black_foundry_controller')
})
