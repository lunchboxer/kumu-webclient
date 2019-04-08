export const GET_SESSIONS = `
 query getSessions($where: ClassSessionWhereInput){
  classSessions (where: $where) {
    id
    startsAt
    endsAt
    stage
    group {
      id
      name
    }
  }
}`

export const GET_CURRENT_SESSION = `
query currentSession($now: DateTime){
  classSessions(where: {
    startsAt_lt: $now,
    endsAt_gt: $now
  }) {
    id
    startsAt
    endsAt
    stage
    group {
      id
      name
    }
  }
}`

export const GET_TODAYS_SESSIONS = `
query todaysSessions($now: DateTime, $latest: DateTime){
  classSessions(where: {
    startsAt_lt: $latest,
    endsAt_gt: $now
  }) {
    id
    startsAt
    endsAt
    stage
    group {
      id
      name
    }
  }
}`
