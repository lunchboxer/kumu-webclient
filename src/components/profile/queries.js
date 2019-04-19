import gql from 'nanographql'

export const GET_ME = gql`
{
  me {
    id
    username
  }
}
`
