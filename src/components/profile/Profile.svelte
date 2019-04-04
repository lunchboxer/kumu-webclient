<script>
  import { onMount } from 'svelte'
  import { me } from './data'
  import Loading from '../Loading'

  onMount(async () => {
    me.get()
  })
</script>

<style>
  dl {
    display: grid;
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
    grid-template-columns: [key] auto [value] auto;
    grid-template-rows: auto;
    justify-content: start;
  }

  dt {
    grid-column: key;
    justify-self: end;
  }

  dd {
    grid-column: value;
  }
</style>

<h1 class="title">User Profile</h1>

{#if $me}
<dl>
  <dt>Username:</dt>
  <dd>{$me.username}</dd>

  <dt>ID:</dt>
  <dd>{$me.id}</dd>
</dl>
  {:else}
  <Loading what="user" />
{/if}