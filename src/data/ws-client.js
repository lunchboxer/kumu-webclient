import { SubscriptionClient } from 'graphql-subscriptions-client'

const host = 'ws://192.168.1.9:4000'

export const ws = new SubscriptionClient(host, {
  reconnect: true,
  connectionCallback: error => {
    error && console.error(error)
  }
})

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
