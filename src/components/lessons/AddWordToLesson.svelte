<script>
  import { onMount } from 'svelte'
  import { words } from '../words/data'
  import Modal from '../Modal.svelte'
  import Error from '../Error.svelte'
  import AddWordRow from './AddWordRow.svelte'

  let open = false
  let searchString = ''
  let loading = false
  let errors = ''

  onMount(() => {
    getWords()
  })

  const getWords = async () => {
    console.log(searchString)
    loading = true
    try {
      await words.get({ searchString })
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

  .add {
    margin-top: 1rem;
  }

  .control {
    margin: 1rem 0;
  }
</style>

<button class="button add" on:click={() => { open = true }}>add words</button>

<Modal bind:open>

  <h2 class="title is-4">Add word to lesson</h2>

  <div class="control search has-icons-left">
    <input class="input" class:is-loading={loading} type="text" bind:value={searchString} on:input={getWords}
      placeholder="Search words">
    <span class="icon is-small is-left">
      <i class="fas fa-search"></i>
    </span>
  </div>

  <Error {errors} />
  <div class="results">
    {#if $words }
      <p>{$words.length} matches:</p>
      {#each $words as word (word.id)}
        <AddWordRow {word} />
      {/each}
      {/if}
    </div>
  
    <div class="buttons">
      <button class="button" on:click={() => { open = false }}>Exit</button>
    </div>
  
  
  </Modal>