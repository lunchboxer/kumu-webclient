export const CLASS_SESSION = /* GraphQL */ `
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

export const CLASS_SESSION_SUB = /* GraphQL */ `
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
