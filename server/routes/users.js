const express = require('express')
const { checkJwt, updateUser, getUser } = require('../auth0')

const router = express.Router()

router.get('/', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub

  if (!auth0_id) {
    res.send(null)
  } else {
    getUser(auth0_id)
      .then((user) => {
        console.log(user)
        res.json(user ? user.user_metadata : null)
      })
      .catch((err) => res.status(500).send(err.message))
  }
})

router.post('/', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  const { color } = req.body
  const userDetails = {
    color,
  }
  console.log(userDetails)
  updateUser(auth0_id, userDetails).then((metadata) => {
    console.log(metadata)
  })

  res.sendStatus(201)
})

module.exports = router
