import { SubscriptionClient } from 'graphql-subscriptions-client'

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

export const ws = new SubscriptionClient(host, {
  reconnect: true,
  connectionCallback: error => {
    error && console.error(error)
  }
})

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

export const maintainStore = (data, store, type) => {
  if (!data || !data[type]) return
  const { mutation, node, previousValues } = data[type]
  const mutateStore = {
    CREATED: function () {
      store.update(previous => {
        return [...previous, node]
      })
    },
    UPDATED: function () {
      store.update(previous => {
        return previous.map(item => {
          if (item.id !== node.id) { return item }
          return node
        })
      })
    },
    DELETED: function () {
      store.update(previous => {
        return previous.filter(item => item.id !== previousValues.id)
      })
    }
  }
  mutateStore[mutation]()
}
export const subscribeToMore = (query, variables, store) => {
  const pattern = /{\n?\s*(\w+)/
  const dataName = query.match(pattern)[1]

  subRequest(query, variables, function (data) {
    if (!data) return
    const { mutation, node, previousValues } = data[dataName]
    if (mutation === 'CREATED') {
      store.update(previous => {
        return [...previous, node]
      })
    } else if (mutation === 'UPDATED') {
      store.update(previous => {
        return previous.map(item => {
          if (item.id !== node.id) return item
          return node
        })
      })
    } else if (mutation === 'DELETED') {
      store.update(previous => {
        return previous.filter(item => item.id !== previousValues.id)
      })
    }
  })
}
