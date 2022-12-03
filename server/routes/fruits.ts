import { Request, Response } from 'express'
import express from 'express'

import { checkJwt } from '../auth0'
import db from '../db/fruits'

const router = express.Router()

export default router

declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: string
      }
    }
  }
}

// A public endpoint that anyone can access
// GET /api/v1/fruits
router.get('/', async (req: Request, res: Response) => {
  try {
    const fruits = await db.getFruits()
    res.json({ fruits })
  } catch (err: unknown) {
    console.error(err)
    res.sendStatus(500)
  }
})

// GET /api/v1/fruits/1
router.get('/:id', async (req, res) => {
  try {
    const fruit = await db.getFruit(req.params.id)
    res.json(fruit)
  } catch (err: unknown) {
    console.error(err)
    res.sendStatus(500)
  }
})

// use checkJwt as middleware
// POST /api/v1/fruits
router.post('/', checkJwt, async (req, res) => {
  const { fruit } = req.body
  const auth0Id = req.user?.sub
  const newFruit = {
    auth0_id: auth0Id,
    name: fruit.name,
    average_grams_each: fruit.averageGramsEach,
  }
  try {
    const fruits = await db.addFruit(newFruit)
    res.json({ fruits })
  } catch (err: unknown) {
    console.error(err)
    res.sendStatus(500)
  }
})

// use checkJwt as middleware
// PUT /api/v1/fruits
router.put('/', checkJwt, async (req, res) => {
  const { fruit } = req.body
  const auth0Id = req.user?.sub
  const fruitToUpdate = {
    id: fruit.id,
    auth0_id: auth0Id,
    name: fruit.name,
    average_grams_each: fruit.averageGramsEach,
  }

  try {
    const fruits = await db.updateFruit(fruitToUpdate, auth0Id)
    res.json({ fruits })
  } catch (err: unknown) {
    console.error(err)
    // if (err.message === 'Unauthorized') {
    //   return res
    //     .status(403)
    //     .send('Unauthorized: Only the user who added the fruit may update it')
    // }
    res.sendStatus(500)
  }
})

// use checkJwt as middleware
// DELETE /api/v1/fruits
router.delete('/:id', checkJwt, async (req, res) => {
  const id = Number(req.params.id)
  // const auth0Id = req.user?.sub
  // try {
  //   const fruits = await db.deleteFruit(id, auth0Id)
  //   res.json({ fruits })
  // } catch (err) {
  //   console.error(err)
  //   if (err.message === 'Unauthorized') {
  //     return res
  //       .status(403)
  //       .send('Unauthorized: Only the user who added the fruit may delete it')
  //   }
  //   res.status(500).send(err.message)
  // }
})
