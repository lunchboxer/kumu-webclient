export const LessonFields = /* GraphQL */`
  fragment LessonFields on Lesson {
    id
    name
    summaryEN
    summaryZH
    homeworkEN
    homeworkZH
    tags {
      id
      name
    }
  }`
