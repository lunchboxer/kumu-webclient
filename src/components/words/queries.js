import { WordFields } from './fragments'

export const WORDS = /* GraphQL */ `
 {
   words {
     ...WordFields
   }
 }
 ${WordFields}`

export const WORD = /* GraphQL */ `
query Word ($id: ID!){
  word (id: $id){
    ...WordFields
  }
}
${WordFields}`
