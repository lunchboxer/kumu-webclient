export const CREATE_SESSION = /* GraphQL */`
mutation newClassSession($groupId: ID!, $lessonId: ID, $input: ClassSessionInput!) {
  createClassSession(input: $input, groupId: $groupId, lessonId: $lessonId) {
    id
    stage
    startsAt
    endsAt
    group {
      name
      id
    }
  }
}
`

export const DELETE_SESSION = /* GraphQL */`
mutation deleteClassSession($id: ID!) {
  deleteClassSession(id: $id) {
    id
    stage
    startsAt
    endsAt
  }
}
`

export const UPDATE_SESSION = /* GraphQL */`
mutation updateClassSession($id: ID!, $lessonId: ID, $groupId: ID, $input: ClassSessionInput) {
  updateClassSession(id: $id, input: $input, groupId: $groupId, lessonId: $lessonId) {
    id
    stage
    startsAt
    endsAt
    group {
      name
      id
    }
  }
}`
