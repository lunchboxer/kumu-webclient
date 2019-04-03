<script>
  export let errors

  $: message = (Array.isArray(errors))
    ? errors.map(e => e.message).join('\n')
    : !errors.message ? errors : errors.message
</script>

<style>
  .error {
    background: #220000;
    border-left: 2px solid #ff5555;
    color: #ff5555;
    padding: 0.3rem 0.6rem;
    margin-bottom: 1rem;
  }

  .error strong {
    color: inherit;
  }
  .error-message i {
    margin-right: 0.3rem;
  }
</style>

{#if message}
<p class="error">
    <span class="error-message"><i class="fas fa-exclamation-triangle"></i><strong>Error:</strong>&nbsp;{message}</span>
</p>
{/if}