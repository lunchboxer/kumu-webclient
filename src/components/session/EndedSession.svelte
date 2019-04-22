<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { session } from './data'
  import { time } from '../../data/timer'
  import { formatDistance, formatRelative } from 'date-fns'
  import DL from '../DL.svelte'
  import Loading from '../Loading.svelte'
  import { SESSION_RESULTS } from './queries'
  import Error from '../Error.svelte'
  import ResultsRow from './ResultsRow.svelte'

  let results = []
  let errors = ''

  onMount(async () => {
    const response = await request(SESSION_RESULTS, { classSessionId: $session.id })
    if (!response.classSession) return
    const { attendances, points } = response.classSession
    results = attendances && attendances.map(attendance => {
      attendance.points = points && points.filter(point => {
        return point.student.id === attendance.student.id
      })
      attendance.pointsTally = attendance.points.reduce((sum, point) => {
        return sum + point.value
      }, 0)
      return attendance
    })
    results.sort((a, b) => {
      return b.pointsTally - a.pointsTally
    })
  })

  $: endedDistance = formatDistance(new Date($session.endedAt), new Date($time), { addSuffix: true })
  const startsAt = formatRelative(new Date($session.startsAt), new Date())
  const startedAt = formatRelative(new Date($session.startedAt), new Date())
  const endedAt = formatRelative(new Date($session.endedAt), new Date())
  const endsAt = formatRelative(new Date($session.endsAt), new Date())
</script>

<style>
  section {
    margin: 1rem 0;
  }
</style>

<p class="subtitle">Ended {endedDistance}</p>

<DL>
  <dt>Schedule start:</dt>
  <dd>{startsAt}</dd>

  <dt>Actual start:</dt>
  <dd>{startedAt}</dd>

  <dt>Schedule end:</dt>
  <dd>{endsAt}</dd>

  <dt>Actual end:</dt>
  <dd>{endedAt}</dd>
</DL>

<Error {errors} />

{#if results && results.length}
<section class="results">
    <h3 class="title is-4">Results</h3>
    <ul>
      {#each results as result (result.id)}
        <ResultsRow {result} />
      {/each}
    </ul>
    
</section>

{:else}
<Loading what="results"/>
{/if}