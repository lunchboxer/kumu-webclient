<script>
  import { students } from './data'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'
  import ConfirmDelete from '../ConfirmDelete.svelte'

  export let open = false
  export let student = {}
  let loading = false
  let errors = ''

  const handleDelete = async () => {
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
      loading = false
    }
  }

</script>

<ConfirmDelete name="student" on:delete={handleDelete} {errors} {loading} bind:open>
  the student named '{student.englishName}'?
</ConfirmDelete>