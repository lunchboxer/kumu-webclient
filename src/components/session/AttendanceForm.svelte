<script>
  import { onMount, onDestroy } from 'svelte'
  import { sessionStudents, session } from './data'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import AttendanceRow from './AttendanceRow.svelte'
  import { ws } from '../../data/ws-client'
  import { request } from '../../data/fetch-client'
  import { ATTENDANCE_SUB } from './queries'
  import { MARK_ALL_PRESENT } from './mutations'

  let errors = ''

  let subscription = null

  onMount(() => {
    // subscribe to attendance changes and update sessionStudent
    subscription = ws.request({ query: ATTENDANCE_SUB, variables: { classSessionId: $session.id } })
      .subscribe({
        next (message) {
          if (message.data && message.data.attendances) {
            sessionStudents.update(previous => {
              return sessionStudents.mapAttendanceToStudents(message.data.attendances, previous)
            })
          }
        }
      })
  })

  onDestroy(() => { subscription && subscription.unsubscribe() })

  const markAllPresent = () => {
    try {
      request(MARK_ALL_PRESENT, { classSessionId: $session.id })
    } catch (error) {
      errors = error
    }
  }
</script>

<style>
  section {
    margin: 1rem 0;
  }

  button {
    margin-bottom: 1rem;
  }

  i {
    margin-right: 0.5rem;
  }
</style>

<section class="attendance-form">
  <Error {errors} />

  <button class="button is-primary is-inverted" on:click={markAllPresent}><i class="fas fa-clipboard-check"></i>All
    present</button>
  {#if $sessionStudents}
      {#if $sessionStudents.length}
        {#each $sessionStudents as student (student.id)}
          <AttendanceRow {student} sessionId={$session.id} />
        {/each}
      {:else}
        <p>No students were found for this class session.</p>
      {/if}
    {:else}
      <Loading what="students" />
    {/if}
</section>