import gql from 'nanographql'
import { LessonFields } from './fragments'

export const CREATE_LESSON = gql`
  mutation CreateLesson($input: LessonCreateInput!){
    createLesson(input: $input) {
      ...LessonFields
  }
  ${LessonFields}`
