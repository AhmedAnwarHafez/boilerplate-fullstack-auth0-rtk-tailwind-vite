import request from 'superagent'

import { User } from '../../common/user'

const rootUrl = '/api/v1'

export function updateUser(user: User, token: string) {
  return request
    .post(`${rootUrl}/users`)
    .set('authorization', `Bearer ${token}`)
    .send(user)
}

export function getUser(token: string): Promise<User> {
  return request
    .get(`${rootUrl}/users`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => res.body)
}
