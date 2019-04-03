import { SubscriptionClient } from 'subscriptions-transport-ws'

const wsEndpoint = 'ws://localhost:4000'

const subsClient = new SubscriptionClient(wsEndpoint, {
  reconnect: true,
  connectionCallback: error => {
    error && console.log(error)
  }
})

export const subsRequest = ({ query, variables }) => {
  return subsClient.request({ query, variables })
}
