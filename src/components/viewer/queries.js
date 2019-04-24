import gql from 'nanographql'

export const ACTIVE_SESSION = gql`
{
  classSessions(where: {stage_in: [Active, Started]}) {
    id
    stage
    startsAt
    startedAt
    endsAt
    group {
      id
    }
  }
}
`

export const ACTIVE_SESSION_SUB = /* GraphQL */`
subscription {
  classSessions(where: { node: {stage_in: [Active, Started]}}) {
    node {
      id
      stage
      startsAt
      startedAt
      endsAt
      group {
        id
      }
    } 
  }
}
`
