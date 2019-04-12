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
    error && console.log(error)
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
  console.log("maintainstore got called")
  if (!data || !data[type]) return
  const { mutation, node, previousValues } = data[type]
  console.log(mutation, node, previousValues)
  const mutateStore = {
    CREATED: function () {
      console.log("created")
      store.update(previous => {
        return [...previous, node]
      })
    },
    UPDATED: function () {
      console.log('mutated', node)
      store.update(previous => {
        return previous.map(item => {
          console.log("item in previous", item)
          if (item.id !== node.id) { console.log("not the changed one"); return item }
          console.log("a match")
          return node
        })
      })
    },
    DELETED: function () {
      console.log('deleted', node)
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
  console.log(store)
  subRequest(query, variables, function (data) {
    console.log('subscribe to more got something')
    if (!data) return
    const { mutation, node, previousValues } = data[dataName]
    if (mutation === 'CREATED') {
      console.log('CREATED')
      store.update(previous => {
        return [...previous, node]
      })
    } else if (mutation === 'UPDATED') {
      console.log('UPDATED')
      store.update(previous => {
        return previous.map(item => {
          if (item.id !== node.id) return item
          return node
        })
      })
    } else if (mutation === 'DELETED') {
      console.log('DELETED')
      store.update(previous => {
        return previous.filter(item => item.id !== previousValues.id)
      })
    }
  })
}
