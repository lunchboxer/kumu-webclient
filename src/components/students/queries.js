export const GET_STUDENTS = `
  query getStudents ($orderBy: StudentOrderByInput, $searchString: String) {
    students (orderBy: $orderBy, searchString: $searchString){
      id
      chineseName
      pinyinName
      englishName
      gender
      birthdate
      pointsTally
      groups {
        id
        name
        semester {
          id
          name
        }
      }
    }
  }
`
