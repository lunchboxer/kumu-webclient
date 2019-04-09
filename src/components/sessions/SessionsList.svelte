<script>
  import { sessions } from './data'
  import { time } from '../../data/timer'
  import Loading from '../Loading.svelte'
  import SessionListItem from './SessionListItem.svelte'
</script>

{#if $sessions}
<h3 class="title is-5">Showing {$sessions.length} sessions</h3>
{#each $sessions as session (session.id)}
  <SessionListItem {session} time={$time} />
{/each}
{:else}
  <Loading what="sessions"/>
{/if}