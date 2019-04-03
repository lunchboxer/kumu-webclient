<script>
  import { students } from './data'
  let sortParam = 'id'
  let direction = 'ASC'
  let searchString = ''

  const reload = () => {
    if (!sortParam && !searchString) return
    students.get(`${sortParam}_${direction}`, searchString)
  }
  const reverse = () => {
    direction = direction === "ASC" ? "DESC" : "ASC"
    reload()
  }
</script>

<style>
  .control {
    margin: 0.5rem;
  }
</style>

<div class="control search has-icons-left">
  <input class="input" type="text" bind:value={searchString} on:input={reload} placeholder="Search">
  <span class="icon is-small is-left">
    <i class="fas fa-search"></i>
  </span>
</div>

<div class="control">
  <div class="select">
    <select bind:value={sortParam} on:change={reload}>
      <option value="id">Sort by: ID</option>
      <option value="pinyinName">Chinese name</option>
      <option value="englishName">English name</option>
      <option value="birthdate">Age</option>
      <option value="gender">Gender</option>
    </select>
  </div>

  <button class="button is-link" on:click={reverse}><i class="fas fa-sort-{direction === 'ASC' ? 'up':'down'}"></i>
  </button>
</div>