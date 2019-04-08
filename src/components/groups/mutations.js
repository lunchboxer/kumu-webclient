export const UPDATE_GROUP = `
  mutation updateGroup($id: ID!, $semesterId: ID, $name: String) {
    updateGroup(id: $id, semesterId: $semesterId, name: $name){
      id
      name
      semester {
        id
        name
        startDate
      }
      students {
        chineseName
        englishName
        pinyinName
        id
      }
    }
  }
`

export const CREATE_GROUP = `
  mutation createGroup($semesterId: ID!, $name: String!) {
    createGroup(semesterId: $semesterId, name: $name){
      id
      name
      semester {
        id
        name
        startDate
      }
      students {
        chineseName
        englishName
        pinyinName
        id
      }
    }
  }
`

export const DELETE_GROUP = `
mutation deleteGroup($id: ID!) {
  deleteGroup(id: $id) {
    id
    name
  }
}
`
