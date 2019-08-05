import { MaterialFields } from './fragments'

export const MATERIALS = /* GraphQL */ `
  query Materials($orderBy: MaterialOrderByInput, $searchString: String) {
    materials (orderBy: $orderBy, searchString: $searchString) {
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
