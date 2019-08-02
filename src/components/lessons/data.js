import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { GET_LESSONS, LESSON } from './queries'
import { CREATE_LESSON, UPDATE_LESSON } from './mutations'

const createLessonsStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    get: async () => {
      const response = await request(GET_LESSONS)
      set(response.lessons)
    },
    // remove: async id => {
    //   const response = await request(DELETE_LESSON, { id })
    //   update(previous =>
    //     previous.filter(lesson => response.deleteLesson.id !== lesson.id)
    //   )
    // },
    create: async (input) => {
      const response = await request(CREATE_LESSON, { input })
      update(previous => !previous ? [response.createLesson] : [...previous, response.createLesson])
    },
    patch: async (input, id) => {
      const response = await request(UPDATE_LESSON, { id, input })
      update(previous => !previous ? previous : previous.map((lesson) => {
        if (lesson.id !== id) return lesson
        return response.updateLesson
      }))
    }
  }
}

export const lessons = createLessonsStore()

const createLessonStore = () => {
  const { subscribe, set } = writable()

  return {
    subscribe,
    get: async (id) => {
      const response = await request(LESSON, { id })
      set(response.lesson)
    }
  }
}

export const lesson = createLessonStore()
