import gql from 'nanographql'

export const CREATE_SESSION = gql`
mutation newClassSession($groupId: ID!, $input: ClassSessionInput!) {
  createClassSession(input: $input, groupId: $groupId) {
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

export const DELETE_SESSION = gql`
mutation deleteClassSession($id: ID!) {
  deleteClassSession(id: $id) {
    id
    stage
    startsAt
    endsAt
  }
}
`

export const UPDATE_SESSION = gql`
mutation updateClassSession($id: ID!, $groupId: ID, $input: ClassSessionInput!) {
  updateClassSession(id: $id, input: $input, groupId: $groupId) {
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

