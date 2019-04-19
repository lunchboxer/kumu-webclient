import gql from 'nanographql'

export const GET_STUDENT = gql`
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

export const ME = gql`
{
  me {
    username
    id
  }
}`

export const ACTIVE_GROUPS = gql`
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

export const CURRENT_NEXT_SEMESTER_GROUPS = gql`
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
