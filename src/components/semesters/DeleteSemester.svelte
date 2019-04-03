<script>
  import { semesters } from './data'
  import { notifications } from '../notifications'


  let deleteButton
  export let open = false
  export let semester = {}
  let loading = false

  const handleDelete = async () => {
    deleteButton.disabled = true
    try {
      await semesters.remove(semester.id)
      open = false
      notifications.add({ text: `Semester '${semester.name}' deleted`, type: "success" })
    } catch (errors) {
      notifications.add({
        text: `Could not delete semester '${semester.name}'`, type: "danger"
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


<h1 class="title">Delete semester</h1>
<p>Are you sure you really want to permanently delete the semester '{semester.name}'?</p>
<div class="buttons">
  <button class="button is-primary" bind:this={deleteButton} on:click={handleDelete}>Delete</button>
  <button class="button" on:click={close}>Keep it</button>
</div>