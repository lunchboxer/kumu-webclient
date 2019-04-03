import gql from 'nanographql'

export const CREATE_SEMESTER = gql`
  mutation createSemester($input: SemesterInput!) {
    createSemester(input: $input) {
      name
      id
      startDate
      endDate
      groups {
        id
        name
      }
    }
  }
`

export const DELETE_SEMESTER = gql`
  mutation deleteSemester($id: ID!) {
    deleteSemester(id: $id) {
      id
      name
    }
  }
`

export const UPDATE_SEMESTER = gql`
  mutation updateSemester($id: ID!, $input: SemesterInput!) {
  updateSemester(input: $input, id: $id) {
    name
      id
      startDate
      endDate
      groups {
        id
        name
      }
  }
}
`
