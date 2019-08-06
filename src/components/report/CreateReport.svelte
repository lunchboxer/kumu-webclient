<script>
  import EditReport from './EditReport.svelte'

  let show = false

  const create = async () => {
    // create a report from lesson
    show = true
  }
</script>

<style>
  .button {
    margin: 1rem;
  }
</style>

{#if show}
  <EditReport show="true"/>
{:else}
  <button class="button" on:click={create}>Create report</button>
{/if}