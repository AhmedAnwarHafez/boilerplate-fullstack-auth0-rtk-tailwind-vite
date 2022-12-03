import request from 'superagent'

import { Fruit } from '../../common/fruit'
import { logError } from '../utils'

const rootUrl = '/api/v1'

export function getFruits() {
  return request
    .get(`${rootUrl}/fruits`)
    .then((res) => res.body.fruits)
    .catch(logError)
}

export function getFruit(id: number) {
  return request
    .get(`${rootUrl}/fruits/${id}`)
    .then((res) => res.body)
    .catch(logError)
}

export function addFruit(fruit: Fruit, token: string) {
  return request
    .post(`${rootUrl}/fruits`)
    .set('authorization', `Bearer ${token}`)
    .send({ fruit })
    .catch(logError)
}

export function updateFruit(fruit: Fruit, token: string) {
  return request
    .put(`${rootUrl}/fruits`)
    .set('authorization', `Bearer ${token}`)
    .send({ fruit })
    .catch(logError)
}

export function deleteFruit(id: number, token: string) {
  return request
    .delete(`${rootUrl}/fruits/${id}`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => res.body.fruits)
    .catch(logError)
}
