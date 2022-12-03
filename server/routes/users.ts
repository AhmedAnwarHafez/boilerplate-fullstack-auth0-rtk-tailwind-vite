import express from 'express'
import { checkJwt, updateUser, getUser } from '../auth0'

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
  updateUser(auth0_id, userDetails)
    .then(() => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
})

export default router
