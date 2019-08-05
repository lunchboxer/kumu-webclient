<script>
  import { onMount } from 'svelte'
  import { materials } from '../materials/data'
  import Modal from '../Modal.svelte'
  import Error from '../Error.svelte'
  import AddMaterialRow from './AddMaterialRow.svelte'

  export let lesson
  let open = false
  let searchString = ''
  let loading = false
  let errors = ''

  onMount(async () => {
    try {
      await materials.get({ searchString })
    } catch (error) {
      errors = error
    } finally {
      loading = false
    }
  })
  const reload = async () => {
    loading = true
    try {
      await materials.get({ searchString })
    } catch (error) {
      errors = error
    } finally {
      loading = false
    }
  }
</script>

<style>
  .buttons {
    padding: 1rem 0;
  }

  .control {
    margin: 1rem 0;
  }
</style>

<button class="button" on:click={() => { open = true }}>add material</button>

<Modal bind:open>

  <h2 class="title is-4">Add material to lesson</h2>

  <div class="control search has-icons-left">
    <input class="input" class:is-loading={loading} type="text" bind:value={searchString} on:input={reload}
      placeholder="Search">
    <span class="icon is-small is-left">
      <i class="fas fa-search"></i>
    </span>
  </div>

  <Error {errors} />
  <div class="results">
    {#if $materials }
    <p>{$materials.length} matches:</p>
    {#each $materials as material (material.id)}
      <AddMaterialRow {material} />
    {/each}
    {/if}
  </div>

  <div class="buttons">
    <button class="button" on:click={() => { open = false }}>Exit</button>
  </div>


</Modal>