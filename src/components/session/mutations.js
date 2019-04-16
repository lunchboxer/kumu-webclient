export const ACTIVATE_SESSION = /* GraphQL */ `
 mutation activateSession($id:ID!){
   activateSession(id:$id) {
     id
   }
 }`
