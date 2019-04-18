import { writable, readable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { ws } from '../../data/ws-client2'
import { CLASS_SESSION, CLASS_SESSION_SUB } from './queries'

// have it reset itself to null when not in use
export const sessionId = writable(null, set => set(null))

export const session = readable(null, set => {
  let subscription
  const unsubscribe = sessionId.subscribe(id => {
    if (!id) return
    if (subscription) {
      subscription.unsubscribe()
    }
    request(CLASS_SESSION, { id })
      .then(response => {
        set(response.classSession)
      })
    subscription = ws.request({ query: CLASS_SESSION_SUB, variables: { id } })
      .subscribe({
        next (message) {
          if (message.data && message.data.classSession) {
            set(message.data.classSession)
          }
        }

      })
  })

  return () => {
    subscription && subscription.unsubscribe()
    unsubscribe()
  }
})
