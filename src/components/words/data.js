import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { WORDS, WORD } from './queries'
import {
  CREATE_WORD,
  UPDATE_WORD
  // DELETE_MATERIAL
} from './mutations'
import { material } from '../materials/data'

const createWordsStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    get: async () => {
      const response = await request(WORDS)
      set(response.words)
    },
    create: async (input) => {
      const response = await request(CREATE_WORD, { input })
      update(previous => !previous ? [response.createWord]
        : [...previous, response.createWord])
    },
    // remove: async id => {
    //   await request(DELETE_MATERIAL, { id })
    //   update(previous => previous && previous.filter(m => m.id !== id))
    //   material.update(previous => (previous && previous.id === id) ? null : previous)
    // },
    patch: async ({ input, id }) => {
      const response = await request(UPDATE_WORD, { id, input })
      update(previous => !previous ? [response.updateWord] : previous.map(w => {
        if (w.id !== id) return w
        return response.updateWord
      }))
      word.update(previous => {
        if (previous && previous.id === id) {
          return response.updateWord
        }
        return previous
      })
    }
  }
}

export const words = createWordsStore()

const createWordStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    patch: words.patch,
    get: async (id) => {
      const response = await request(WORD, { id })
      set(response.word)
    }
  }
}

export const word = createWordStore()
