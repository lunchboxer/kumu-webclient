import gql from 'nanographql'

export const ACTIVATE_SESSION = gql`
 mutation activateSession($id:ID!){
   activateSession(id:$id) {
     id
   }
 }`

export const START_CLASS = gql`
mutation startClass($id: ID!, $now: DateTime!) {
  updateClassSession(id: $id, input: {stage: Started, startedAt: $now}) {
    id
  }
  markRestAbsent(classSessionId: $id)
}
`

export const END_CLASS = gql`
mutation endClass($id: ID!, $now: DateTime!) {
  updateClassSession(id: $id, input: {stage: Ended, endedAt: $now}) {
    id
  }
}`

export const UPDATE_ATTENDANCE = gql`
mutation updateAttendance($classSessionId: ID!, $studentId: ID!, $status: String!){
  updateAttendance(classSessionId: $classSessionId, studentId: $studentId, status: $status){
    id
  }
}
`

export const MARK_ALL_PRESENT = gql`
mutation markAllPresent($classSessionId: ID!) {
  markAllPresent(classSessionId: $classSessionId)
}
`

export const UNDO_POINT = gql`
mutation undoPoint($id: ID!) {
  undoPoint(id: $id) {
    id
  }
}
`

export const ADD_POINT = gql`
mutation addPoint($value: Int!, $studentId: ID!, $classSessionId: ID!) {
  addPoint(value: $value, studentId: $studentId, classSessionId: $classSessionId) {
    id
    value
    student {
      englishName
      chineseName
      id
    }
  }
} `
