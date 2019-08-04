import { MaterialFields } from './fragments'

export const CREATE_MATERIAL = /* GraphQL */ `
 mutation CreateMaterial($input: MaterialCreateInput!) {
   createMaterial(input: $input) {
     ...MaterialFields
   }
 }
 ${MaterialFields}`
