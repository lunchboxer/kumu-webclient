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
