import server from './server'

const port = process.env.PORT || 3001

server.get('/api/ping', (req, res) => {
  res.send('helo')
})

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening...')
})
