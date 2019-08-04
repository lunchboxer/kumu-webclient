import { MaterialFields } from './fragments'

export const MATERIALS = /* GraphQL */ `
  query Materials {
    materials {
      ...MaterialFields
    }
  }
  ${MaterialFields}`

export const MATERIAL = /* GraphQL */ `
  query Material($id: ID!){
    material(id: $id) {
      ...MaterialFields
    }
  }
  ${MaterialFields}`
