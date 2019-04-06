<script>
  import { todaysSessions } from './data'
  import { time } from '../../data/timer'
  import Loading from '../Loading'
  import SessionListItem from './SessionListItem'
</script>

{#if $todaysSessions}
  {#if $todaysSessions && $todaysSessions.soon && $todaysSessions.soon.length}
    <h3 class="title is-5">{$todaysSessions.soon.length} Lesson{$todaysSessions.soon.length-1 && 's' || ''} starting in the next 15 minutes</h3>
    {#each $todaysSessions.soon as session (session.id)}
    <SessionListItem {session} time={$time} />
    {/each}
    {/if}
  {#if $todaysSessions && $todaysSessions.later && $todaysSessions.later.length}
    <h3 class="title is-5">{$todaysSessions.later.length} Lesson{$todaysSessions.later.length-1 && 's' || ''} starting within 24 hours</h3>
    {#each $todaysSessions.later as session (session.id)}
    <SessionListItem {session} time={$time} />
    {/each}
    {/if}
{:else}
  <Loading what="today's lessons" />
{/if}