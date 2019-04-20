import { writable, readable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { ws } from '../../data/ws-client'
import { CLASS_SESSION, CLASS_SESSION_SUB, GET_SESSION_STUDENTS } from './queries'

// have it reset itself to null when not in use
export const sessionId = writable(null, set => set(null))

export const session = readable(null, set => {
  let subscription
  const unsubscribe = sessionId.subscribe(id => {
    if (!id) return
    if (subscription) {
      subscription.unsubscribe()
    }
    request(CLASS_SESSION, { id })
      .then(response => {
        set(response.classSession)
      })
    subscription = ws.request({ query: CLASS_SESSION_SUB, variables: { id } })
      .subscribe({
        next (message) {
          if (message.data && message.data.classSession) {
            set(message.data.classSession)
          }
        }
      })
  })
  return () => {
    subscription && subscription.unsubscribe()
    unsubscribe()
  }
})

const createSessionStudentStore = () => {
  const mapAttendanceToStudents = (attendances, students) => {
    if (attendances && attendances.length === 0) return students
    attendances = Array.isArray(attendances) ? attendances : [attendances]
    return students.map(student => {
      const attendance = attendances.find(a => {
        if (!a.student) return false
        return a.student.id === student.id
      })
      if (attendance) {
        student.attendance = attendance
      }
      return student
    })
  }
  const { subscribe, update } = writable(null, set => {
    const unsubscribe = session.subscribe(session => {
      if (!session) return
      request(GET_SESSION_STUDENTS, { groupId: session.group.id, classSessionId: session.id })
        .then(response => {
          set(mapAttendanceToStudents(response.attendances, response.students))
        })
    })
    return () => unsubscribe()
  })
  return {
    subscribe, update, mapAttendanceToStudents
  }
}
export const sessionStudents = createSessionStudentStore()

// there are a few different ways to get the attendance status.
// 1. get it in the above students query then subscribe to a query which will updat that one
// this has a few problems. first that store isn't writable, so it would need to be a new one.
