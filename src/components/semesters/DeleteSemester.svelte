<script>
  import { semesters } from './data'
  import { notifications } from '../notifications'
  import ConfirmDelete from '../ConfirmDelete.svelte'

  export let open = false
  export let semester = {}
  let loading = false
  let errors = ''

  const handleDelete = async () => {
    deleteButton.disabled = true
    loading = true
    try {
      await semesters.remove(semester.id)
      open = false
      notifications.add({ text: `Semester '${semester.name}' deleted`, type: 'success' })
    } catch (error) {
      errors = error
      notifications.add({
        text: `Could not delete semester '${semester.name}'`, type: 'danger'
      })
    } finally {
      loading = false
      deleteButton.disabled = false
    }
  }

</script>

<ConfirmDelete name="semester" on:delete={handleDelete} {errors} {loading} bind:open>
  the semester '{semester.name}'?
</ConfirmDelete>