<script>
  import { session } from './data'
</script>

{#if $session}
  <h2 class="title">{$session.group.name} class lesson {$session.number}</h2>
  {$session.id}
  <p>{$session.startsAt} to {$session.endsAt}</p>
{/if}