<script>
  export let url = ""
  export let text = ""
  export let icon = null
  export let active = ""
</script>
<style>
  i {
    margin-right: 0.3rem;
  }

  a.is-active {
    border-radius: 4px;
    color: #cb2d6f;
    font-weight: bold;
    background-color: inherit;
  }
</style>

<a class="navbar-item" class:is-active={active===url} href={url}>
  {#if icon}
  <i class="fas {icon}"></i>
  {/if}
  {text} 
</a>