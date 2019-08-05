<script>
  export let materials
</script>

<style>
  section {
    margin: 1rem 0;
    padding: 1rem 0;
  }

  li {
    display: flex;
    flex-wrap: wrap;
  }

  .type {
    margin: 0 1rem;
  }
</style>

{#if materials && materials.length > 0}
  <section class="materials-list">
    {#each materials as material (material.id)}
      <li>
        <a href="#/material/{material.id}">{material.title}</a> <span class="type">{material.type}</span>
         {#if material.tags && material.tags.length > 0}
         <div class="tags">
          {#each material.tags as tag (tag.id)}
            <span class="tag">{tag.name}</span>
          {/each}
          </div>
         {/if}
        </li>
    {/each}
  </section>
{/if}