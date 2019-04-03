<script>
  export let url = ""
  export let text = ""

  // $: active = () => {
  //   if (url === "/" && !segment) return true;
  //   return segment === url;
  // }

</script>

<a class="navbar-item" href={url}>{text} </a>