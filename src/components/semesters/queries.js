import gql from 'nanographql'

export const GET_SEMESTERS = gql`
  {
    semesters {
      id
      name
      startDate
      endDate
      groups {
        id
        name
      }
    }
  }
`
