<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { session, results } from './data'
  import { time } from '../../data/timer'
  import { formatDistance, formatRelative } from 'date-fns'
  import DL from '../DL.svelte'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import ResultsRow from './ResultsRow.svelte'

  let errors = ''

  $: endedDistance = formatDistance(new Date($session.endedAt), new Date($time), { addSuffix: true })
  const relative = (date) => date && formatRelative(new Date(date), new Date())
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

{#if $results}
<section class="results">
    <h3 class="title is-4">Results</h3>
    <ul>
      {#each $results as result (result.id)}
        <ResultsRow {result} />
      {/each}
    </ul>
    
</section>

{:else}
<Loading what="results"/>
{/if}