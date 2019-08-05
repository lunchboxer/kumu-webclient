<script>
  import { words } from './data'

  let searchString = ''
  let loading = false

  const getWords = async () => {
    loading = true
    try {
      await words.get({ searchString })
    } catch (error) {
      console.error(error)
    } finally {
      loading = false
    }
  }
</script>

<style>
  .control {
    margin: 1rem 0;
  }

  .input {
    max-width: 20rem;
  }
</style>

<div class="control search has-icons-left" class:is-loading={loading}>
  <input class="input" type="text" bind:value={searchString} on:input={getWords} placeholder="Search words">
  <span class="icon is-small is-left">
    <i class="fas fa-search"></i>
  </span>
</div>