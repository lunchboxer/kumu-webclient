<script>
  import { request } from '../../data/fetch-client'
  import { onMount } from 'svelte'
  import { GET_SESSIONS } from './queries'
  import { sessions } from './data'
  import { time } from '../../data/timer'
  import Loading from '../Loading'
  import Error from '../Error'
  import SessionListItem from './SessionListItem'
</script>

{#if $sessions}
<h3 class="title is-5">Showing {$sessions.length} sessions</h3>
{#each $sessions as session}
  <SessionListItem {session} time={$time} />
{/each}
{:else}
  <Loading what="sessions"/>
{/if}