<script>
  export let url = ""
  export let text = ""
  export let icon = null

  // $: active = () => {
  //   if (url === "/" && !segment) return true;
  //   return segment === url;
  // }

</script>
<style>
  i {
    margin-right: 0.3rem;
  }
</style>

<a class="navbar-item" href={url}>
  {#if icon}
  <i class="fas {icon}"></i>
  {/if}
  {text} 
</a>