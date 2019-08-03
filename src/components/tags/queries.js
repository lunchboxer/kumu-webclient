export const TAGS = /* GraphQL */ `
 {
   tags {
     id
     name
     connections
   }
 }`

export const TAG = /* GraphQL */ `
 {
   tag {
     id
     name
     materials {
       id
       title
     }
    words {
      id
      english
    }
    lessons {
      id
      name
    }
   }
 }`
