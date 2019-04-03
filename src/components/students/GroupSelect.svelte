<script>
  import { onMount } from 'svelte';
  import { request } from '../../data/fetch-client'
  import { ACTIVE_GROUPS } from '../../data/queries'

  let groups
  let selectElement
  let error = ""
  export let groupId = ""

  onMount(() => {
    groups = request(ACTIVE_GROUPS)
  })

  function checkValidity() {
    error = !selectElement.validity.valid && selectElement.validationMessage
      ? selectElement.validationMessage
      : ''
  }
</script>

<style>
  .select {
    margin-bottom: 1rem;
  }
</style>

<div class="select">
  <select bind:value={groupId} bind:this={selectElement} on:invalid|preventDefault={checkValidity}>
    {#await groups}
      <option>Loading groups ...</option>
    {:then result}
      {#if result && result.activeGroups.length}
        <option value="">Group (please select)</option>
        {#each result.activeGroups as group}
          <option value={group.id}>{group.semester.name}&nbsp;{group.name}</option>
        {/each}
      {/if}
    {:catch}
      <option>Loading groups ...</option>
    {/await}
  </select>
  {#if error}
  <p class="help is-danger">{error}</p>
  {/if}
</div>