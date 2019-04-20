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
  markRestAbsent(classSessionId: $id)
}
`

export const UPDATE_ATTENDANCE = gql`
mutation updateAttendance($classSessionId: ID!, $studentId: ID!, $status: String!){
  updateAttendance(classSessionId:$classSessionId, studentId: $studentId, status: $status){
    id
  }
}
`

export const MARK_ALL_PRESENT = gql`
mutation markAllPresent($classSessionId: ID!) {
  markAllPresent(classSessionId: $classSessionId)
}
`
