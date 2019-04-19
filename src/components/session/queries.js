import gql from 'nanographql'

export const CLASS_SESSION = gql`
 query classSession($id: ID!){
   classSession (id: $id){
     id
     stage
     startsAt
     endsAt
     number
     group {
       id
       name
     }
   }
 }`

export const CLASS_SESSION_SUB = /* GraphQL */`
subscription classSession($id: ID!){
  classSession (id: $id){
    id
    stage
    startsAt
    endsAt
    number
    group {
      id
      name
    }
  }
}`

export const GET_SESSION_STUDENTS = gql`
query students($groupId: ID!, $classSessionId: ID!){
  students (where: { groups_some: {id: $groupId}}) {
    id
    chineseName
    pinyinName
    englishName
  }
  attendances (where: {classSession: {id: $classSessionId}}) {
    student {
      id
    }
    status
  }
}
`
