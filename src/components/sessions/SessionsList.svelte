<script>
  import { request } from '../../data/fetch-client'
  import { GET_SESSIONS, GET_TODAYS_SESSIONS } from './queries'
  import { time } from '../../data/timer'
  import Loading from '../Loading'
  import Error from '../Error'
  import SessionListItem from './SessionListItem'

  export let where = null

  $: sessions = request(GET_SESSIONS, { where })
</script>

{#await sessions}
<Loading what="all sessions"/>
{:then result}
{#if result && result.classSessions}
<h3 class="title is-5">Showing {result.classSessions.length} sessions</h3>
{#each result.classSessions as session}
  <SessionListItem {session} time={$time} />
{/each}
{/if}
{:catch errors}
<Error {errors} />
{/await}