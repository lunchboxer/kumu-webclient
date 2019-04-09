// using plain websockets to communicate with a graphql server
// https://github.com/apollographql/subscriptions-transport-ws/blob/master/PROTOCOL.md

const randomId = (size = 6) => {
  let id = ''
  // eslint-disable-next-line no-undef
  let bytes = crypto.getRandomValues(new Uint8Array(size))
  while (size-- > 0) {
    id += 'Uint8ArdomValuesObj012345679BCDEFGHIJKLMNPQRSTWXYZ_cfghkpqvwxyz-'[bytes[size] & 63]
  }
  return id
}

const host = 'ws://localhost:4000'
const protocol = 'graphql-ws'

// eslint-disable-next-line no-undef
const ws = new WebSocket(host, protocol)

const formatRequest = (query, variables, id) => {
  const miniQuery = query.replace(/\s+/g, ' ')
  return JSON.stringify({
    type: 'start',
    id,
    payload: { query: miniQuery, variables }
  })
}

export const subRequest = (query, variables, callback) => {
  const id = randomId()
  const request = formatRequest(query, variables, id)
  if (ws.readyState === 1) {
    ws.send(request)
  } else {
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({ type: 'connection_init', payload: {} }))
      ws.send(request)
    })
  }
  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data)
    if (data.type === 'data' && data.id === id) {
      callback(data.payload.data)
    }
  })
}

export const wsQueryRequest = (query, variables) => {
  const id = randomId()
  const request = formatRequest(query, variables, id)
  return new Promise((resolve, reject) => {
    const onOpen = () => ws.send(request)
    const onMessage = event => {
      const data = JSON.parse(event.data)
      if (data.type === 'data' && data.id === id) {
        if (data.payload.errors) {
          reject(data.payload.errors)
        }
        resolve(data.payload.data)
        ws.removeEventListener('message', onMessage)
        ws.removeEventListener('open', onOpen)
      }
    }
    try {
      ws.addEventListener('message', onMessage)
      if (ws.readyState === 1) {
        ws.send(request)
      } else {
        ws.addEventListener('open', onOpen)
      }
    } catch (error) {
      reject(error)
      ws.removeEventListener('message', onMessage)
      ws.removeEventListener('open', onOpen)
    }
  })
}
