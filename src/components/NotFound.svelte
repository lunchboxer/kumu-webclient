<script>
  import { location, pop } from 'svelte-spa-router'
</script>
<style>
  .container {
    margin: 4rem;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .primary {
    color: #cb2d6f;
  }

  .button {
    margin-top: 1rem;
  }
</style>

<div class="container">
  <section>
    <h1 class="title is-1 primary"><i class="fas fa-frown-open"></i>&nbsp;404</h1>
    <h2 class="subtitle is-3">resource not found</h2>

    <p>The path '{$location}' leads nowhere</p>
    <p>It might be wise to return to the <a href="#/">main page</a>.</p>
    <button on:click={pop} class="button is-link"><i class="fas fa-backward"></i>&nbsp;go back</button>
  </section>
</div>