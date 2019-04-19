import gql from 'nanographql'

export const GET_GROUPS = gql`
  {
    groups {
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
