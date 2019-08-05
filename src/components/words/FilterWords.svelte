<script>
  import { words } from './data'

  let searchString = ''
  let loading = false
  let tagFilter = ''

  const getWords = async () => {
    const where = {}
    loading = true
    if (searchString) {
      where.OR = [{ english_contains: searchString }, { chinese_contains: searchString }]
    }
    if (tagFilter) {
      where.tags_some = { id: tagFilter }
    }
    try {
      await words.get({ where })
    } catch (error) {
      console.error(error)
    } finally {
      loading = false
    }
  }

  $: tags = $words && [...new Set($words.reduce((tags, word) => {
    return [...tags, ...word.tags]
  }, []))]
</script>

<style>
  .filters {
    display: flex;
    flex-wrap: wrap;
  }

  .control {
    margin: 1rem 0;
  }

  .field {
    max-width: 15rem;
    margin: 0.5rem;
  }
</style>

<section class="filters">

  <div class="field">
    <div class="control search has-icons-left" class:is-loading={loading}>
      <input class="input" type="text" bind:value={searchString} on:input={getWords} placeholder="Search words">
      <span class="icon is-small is-left">
        <i class="fas fa-search"></i>
      </span>
    </div>
  </div>

  {#if tags}
    <div class="field">
      <div class="control has-icons-left">
        <div class="select">
          <select on:change={getWords} bind:value={tagFilter}>
            <option value="">No tag filter</option>
            {#each tags as tag (tag.id)}
              <option value={tag.id}>{tag.name}</option>
            {/each}
          </select>
        </div>
        <div class="icon is-small is-left">
          <i class="fas fa-tag"></i>
        </div>
      </div>
    </div>
  {/if}
  
</section>