import request from 'superagent'

const rootUrl = '/api/v1'

export function updateUser(user, token) {
  return request
    .post(`${rootUrl}/users`)
    .set('authorization', `Bearer ${token}`)
    .send(user)
}

export function getUser(token) {
  return request
    .get(`${rootUrl}/users`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => res.body)
}
