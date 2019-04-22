<script>
  export let name = ''
  export let color = 'white'
</script>

<style>
  button {
    cursor: pointer;
    border: none;
    background: none;
    border-radius: 4px;
    padding: 0;
    margin: 0.5rem;
    font-size: inherit;
    outline: none;
  }

  button:hover {
    color: #bbb;
  }
</style>

<button on:click><i class="fas fa-{name}" style="color:{color}"></i></button>