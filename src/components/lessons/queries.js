import { LessonFields } from './fragments'

export const GET_LESSONS = /* GraphQL */`
  query {
    lessons {
      ...LessonFields
    }
  }
  ${LessonFields}`
