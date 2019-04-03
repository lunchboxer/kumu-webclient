<script>
  export let what = "things"
</script>

<style>
  div {
    width: 100%;
    text-align: center;
    padding: 1rem;
  }

  .spinner {
    color: #14a098;
    font-size: 150%;
    padding: 0.5rem;
  }
</style>

<div>
  <i class="fas fa-circle-notch fa-spin spinner"></i>
  <p>
    Loading {what} ...
  </p>
</div>