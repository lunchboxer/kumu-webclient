<script>
  import { onMount } from 'svelte'
  import { me } from './data'
  import Loading from '../Loading'

  onMount(async () => {
    me.get()
  })
</script>

<style>
  li span.list-label {
    display: inline-block;
    width: 8rem;
    font-weight: bold;
  }
</style>

<h1 class="title">User Profile</h1>

{#if $me}
<ul>
  <li><span class="list-label">Username:</span> {$me.username}</li>
  <li><span class="list-label">ID:</span> {$me.id}</li>
</ul>
  {:else}
  <Loading what="user" />
{/if}