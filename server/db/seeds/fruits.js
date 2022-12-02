exports.seed = (knex) => {
  return knex('fruits')
    .del()
    .then(() => {
      return knex('fruits').insert([
        {
          id: 1,
          name: 'Banana',
          average_grams_each: 120,
          auth0_id: 'auth0|123',
        },
        {
          id: 2,
          name: 'Apple',
          average_grams_each: 195,
          auth0_id: 'auth0|124',
        },
        {
          id: 3,
          name: 'Feijoa',
          average_grams_each: 50,
          auth0_id: 'auth0|125',
        },
      ])
    })
}
