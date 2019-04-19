import gql from 'nanographql'

export const ACTIVATE_SESSION = gql`
 mutation activateSession($id:ID!){
   activateSession(id:$id) {
     id
   }
 }`

export const START_CLASS = gql`
mutation startClass($id: ID!) {
  updateClassSession(id: $id, input: {stage: Started}) {
    id
  }
}
`
