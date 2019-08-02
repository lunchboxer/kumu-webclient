import gql from 'nanographql'
import { LessonFields } from './fragments'

export const GET_LESSONS = gql`
  query {
    lessons {
      ...LessonFields
    }
    ${LessonFields}
  }`
