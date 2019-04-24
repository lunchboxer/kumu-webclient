<script>
  import { session, sessionStudents, sessionId } from '../session/data'
  import ScoreboardRow from './ScoreboardRow.svelte'
</script>

<style>
  section {
    height: calc(100vh - 5rem);
  }

  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>

<h2 class="title">{$session.group.name} class lesson {$session.number}</h2>

{#if $sessionStudents}
<section class="scoreboard">
  <ul>
    {#each $sessionStudents as student (student.id)}
      <ScoreboardRow {student} sessionId={$sessionId} />
    {/each}
    </ul>
</section>
{/if}