import { WordFields } from './fragments'

export const WORDS = /* GraphQL */ `
 query Words ($orderBy: WordOrderByInput, $searchString: String, $where: WordWhereInput){
   words (orderBy: $orderBy, searchString: $searchString, where:$where){
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
