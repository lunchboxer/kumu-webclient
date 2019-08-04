<script>

  export let materials = []
</script>

<style>
  section {
    margin: 1rem 0;
    padding: 1rem 0;
  }
</style>

{#if materials.length > 0}
  <section class="materials-list">
    {#each materials as material (material.id)}
      <li><a href="#/material/{material.id}">{material.title}</a></li>
    {/each}
  </section>
{/if}