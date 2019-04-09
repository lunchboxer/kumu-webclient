import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { GET_ME } from './queries'

const createProfileStore = () => {
  const { subscribe, set } = writable()

  return {
    subscribe,
    get: async () => {
      const getres = await request(GET_ME)
      console.log(getres)
      set(getres.me)
    }
  }
}

export const me = createProfileStore()
