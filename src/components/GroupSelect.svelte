<script>
  import { onMount } from 'svelte'
  import { request } from '../data/fetch-client'
  import { ACTIVE_GROUPS } from '../data/queries'

  export let groups
  let selectElement
  let error = ''
  export let groupId = ''
  export let required = false

  onMount(async () => {
    if (!groups) {
      const result = await request(ACTIVE_GROUPS)
      groups = !result ? [] : result.activeGroups
    }
  })

  $: console.log(groups)
  function checkValidity () {
    error = !selectElement.validity.valid && selectElement.validationMessage
      ? selectElement.validationMessage
      : ''
  }
</script>

<style>
  .field {
    margin-bottom: 1rem;
  }
</style>

<div class="field">

  <div class="select">
    <select bind:value={groupId} bind:this={selectElement} class:is-loading={!groups}
      on:invalid|preventDefault={checkValidity} {required}>
      {#if groups}
      <option value="">Select group...</option>
      {#each groups as group}
        <option value={group.id}>{group.semester ? group.semester.name + ' ': ""}{group.name} class</option>
      {/each}
    {:else}
      <option>Loading groups ...</option>
    {/if}
  </select>
</div>
{#if error} 
<p class="help is-danger">{error}</p>
{/if}
</div>