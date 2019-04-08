export const GET_SEMESTERS = `
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
