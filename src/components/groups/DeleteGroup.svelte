<script>
  import { groups } from './data'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'

  let deleteButton
  export let open = false
  export let group = {}
  let loading = false
  let errors = ""

  const handleDelete = async () => {
    const { id, name } = group
    deleteButton.disabled = true
    try {
      await groups.remove(id)
      open = false
      notifications.add({ text: `${name} class deleted`, type: "success" })
    } catch (error) {
      errors = error
      notifications.add({
        text: `Could not delete ${name} class`, type: "danger"
      })
    }
  }
  const close = () => open = false

</script>

<style>
  .buttons {
    float: right;
    padding: 1rem;
  }
</style>

<h1 class="title">Delete group</h1>
<Error {errors} />
<p>Are you sure you really want to permanently delete the {group.name} class?</p>
<div class="buttons">
  <button class="button is-primary" bind:this={deleteButton} on:click={handleDelete}>Delete</button>
  <button class="button" on:click={close}>Keep it</button>
</div>