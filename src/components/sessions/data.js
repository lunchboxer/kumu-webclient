import { writable, readable, get } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { GET_SESSIONS, GET_TODAYS_SESSIONS } from './queries'
import { CREATE_SESSION } from './mutations'

export const semester = writable()

const createSessionsStore = () => {
  const { subscribe, set } = writable()
  return {
    subscribe,
    get: async () => {
      const where = (get(sessionsFilter))
      const getres = await request(GET_SESSIONS, { where })
      set(getres.classSessions)
    },
    create: async (input, groupId) => {
      const response = await request(CREATE_SESSION, { input, groupId })
      sessions.get()
      return response.createClassSession
    }
  }
}

export const sessionsFilter = writable()

export const sessions = createSessionsStore()

const fetchTodaysSessions = async () => {
  const now = new Date()
  const latest = new Date(now.getTime() + 24 * 3.6e+6)
  const response = await request(GET_TODAYS_SESSIONS, { now, latest })
  return response.classSessions
}

const sortSessions = (sessions) => {
  const time = new Date()
  const in15Min = new Date(time.getTime() + 15 * 60000).toISOString()
  const in24hrs = new Date(time.getTime() + 24 * 3.6e+6).toISOString()
  const now = sessions.find(session => {
    return session.startsAt < time.toISOString() && session.endsAt > time.toISOString()
  })
  const soon = sessions.filter(session => {
    return session.startsAt > time.toISOString() && session.startsAt < in15Min
  })
  const later = sessions.filter(session => {
    return session.startsAt > in15Min && session.startsAt < in24hrs
  })
  return { now, soon, later }
}

export const todaysSessions = readable(null, set => {
  // get the initial data
  let updatedAt = new Date()
  let sessions = []
  fetchTodaysSessions().then(result => {
    sessions = result
    set({ ...sortSessions(result), updatedAt })
  })

  const interval = setInterval(() => {
    // refetch data every 5 minutes
    const now = new Date()
    const expiry = new Date(now - 5 * 60000)
    if (updatedAt < expiry) {
      fetchTodaysSessions().then(result => {
        sessions = result
        let updatedAt = new Date()
        set({ ...sortSessions(sessions), updatedAt })
      })
    } else {
      set({ ...sortSessions(sessions), updatedAt })
    }
  }, 15000)

  return () => clearInterval(interval)
})
