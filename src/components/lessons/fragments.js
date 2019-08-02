import gql from 'nanographql'

export const LessonFields = gql`
  fragment LessonFields on Lesson {
    id
    name
    summary_EN
    summary_ZH
    homework_EN
    homework_ZH
    tags {
      id
      name
    }
  }`
