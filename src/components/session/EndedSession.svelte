<script>
  import { session } from './data'
  import { onMount } from 'svelte'
  import { time } from '../../data/timer'
  import { formatDistance, formatRelative } from 'date-fns'
  import DL from '../DL.svelte'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import ResultsRow from './ResultsRow.svelte'
  import { request } from '../../data/fetch-client'
  import { SESSION_RESULTS } from './queries'

  export let id
  let errors = ''
  let results

  $: endedDistance = formatDistance(new Date($session.endedAt), new Date($time), { addSuffix: true })
  const relative = (date) => date && formatRelative(new Date(date), new Date())

  onMount(async () => {
    const response = await request(SESSION_RESULTS, { id })
    if (!response.classSession) return
    const { attendances, points } = response.classSession
    const withPoints = attendances && attendances.map(attendance => {
      attendance.points = points && points.filter(point => {
        return point.student.id === attendance.student.id
      })
      attendance.pointsTally = attendance.points.reduce((sum, point) => {
        return sum + point.value
      }, 0)
      return attendance
    })
    results = withPoints.slice().sort((a, b) => {
      return b.pointsTally - a.pointsTally
    })
  })
</script>

<style>
  section {
    margin: 1rem 0;
  }
</style>

<p class="subtitle">Ended {endedDistance}</p>

<DL>
  <dt>Schedule start:</dt>
  <dd>{relative($session.startsAt)}</dd>

  <dt>Actual start:</dt>
  <dd>{relative($session.startedAt)}</dd>

  <dt>Schedule end:</dt>
  <dd>{relative($session.endsAt)}</dd>

  <dt>Actual end:</dt>
  <dd>{relative($session.endedAt)}</dd>
</DL>

<Error {errors} />

{#if results}
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