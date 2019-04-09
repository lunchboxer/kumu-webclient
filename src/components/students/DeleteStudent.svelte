<script>
  import { students } from './data'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'

  let deleteButton
  export let open = false
  export let student = {}
  let loading = false
  let errors = ''

  const handleDelete = async () => {
    deleteButton.disabled = true
    loading = true
    try {
      await students.remove(student.id)
      open = false
      notifications.add({ text: `Student '${student.englishName}' deleted`, type: 'success' })
    } catch (error) {
      errors = error
      notifications.add({
        text: `Could not delete student '${student.englishName}'`, type: 'danger'
      })
    } finally {
      deleteButton.disabled = false
      loading = false
    }
  }
  const close = () => { open = false }

</script>

<style>
  .buttons {
    float: right;
    padding: 1rem;
  }
</style>
<h1 class="title">Delete student</h1>
<Error {errors} />
<p>Are you sure you really want to permanently delete the student '{student.englishName}'?</p>
<div class="buttons">
  <button class="button is-primary" class:is-loading={loading} bind:this={deleteButton}
    on:click={handleDelete}>Delete</button>
  <button class="button" on:click={close}>Keep it</button>
</div>