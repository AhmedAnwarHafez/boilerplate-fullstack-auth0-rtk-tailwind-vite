const connection = require('./connection')

module.exports = {
  getFruits,
  getFruit,
  addFruit,
  updateFruit,
  deleteFruit,
}

function sort(fruitArray) {
  const allFruits = [...fruitArray]
  allFruits.sort((a, b) => a.id - b.id)
  return allFruits
}

function getFruits(db = connection) {
  return db('fruits').select(
    'id',
    'name',
    'average_grams_each as averageGramsEach',
    'auth0_id as auth0Id'
  )
}

function getFruit(id, db = connection) {
  return getFruits(db).where('id', id).first()
}

function addFruit(fruit, db = connection) {
  return db('fruits')
    .insert(fruit)
    .then(() => db)
    .then(getFruits)
    .then(sort)
}

function updateFruit(newFruit, auth0Id, db = connection) {
  return db('fruits')
    .where('id', newFruit.id)
    .first()
    .then((fruit) => authorizeUpdate(fruit, auth0Id))
    .then(() => {
      return db('fruits').where('id', newFruit.id).update(newFruit)
    })
    .then(() => db)
    .then(getFruits)
    .then(sort)
}

function deleteFruit(id, auth0Id, db = connection) {
  return db('fruits')
    .where('id', id)
    .first()
    .then((fruit) => authorizeUpdate(fruit, auth0Id))
    .then(() => {
      return db('fruits').where('id', id).delete()
    })
    .then(() => db)
    .then(getFruits)
    .then(sort)
}

function authorizeUpdate(fruit, auth0Id) {
  if (fruit.auth0_id !== auth0Id) {
    throw new Error('Unauthorized')
  }
}
