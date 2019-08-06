<script>
  import ReportForm from './ReportForm.svelte'

  export let show = false
</script>

<style>
  .button {
    margin: 1rem;
  }
</style>

{#if show}
  <ReportForm />
{:else}
  <button class="button" on:click={() => { show = true }}></button>
{/if}