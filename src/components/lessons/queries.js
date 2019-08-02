import { LessonFields } from './fragments'

export const GET_LESSONS = /* GraphQL */`
  query {
    lessons {
      id
      name
      tags {
        id
        name
      }
    }
  }`

export const LESSON = /* GraphQL */`
  query Lesson($id: ID!) {
    lesson(id: $id){
      ...LessonFields
    }
  }
  ${LessonFields}`
