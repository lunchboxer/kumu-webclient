import { LessonFields } from './fragments'

export const CREATE_LESSON = /* GraphQL */`
  mutation CreateLesson($input: LessonCreateInput!){
    createLesson(input: $input) {
      ...LessonFields
    }
  }
  ${LessonFields}`
