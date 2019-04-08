export const GET_STUDENT = `
query student($id: ID!) { 
  student (id: $id){
    chineseName
    pinyinName
    englishName
    id
    groups {
      name
    }
    gender
    pointsTally
  }
}
`

export const ME = `
{
  me {
    username
    id
  }
}`

export const ACTIVE_GROUPS = `
{
  activeGroups {
    id
    name
    semester {
      name
    }
  }
}
`

export const CURRENT_NEXT_SEMESTER_GROUPS = `
{
  currentSemester {
    id
    name
    groups {
      id
      name
    }
  }
  nextSemester {
    id
    name
    groups {
      id
      name
    }
  }
}
`
