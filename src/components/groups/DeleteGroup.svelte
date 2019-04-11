<script>
  import { groups } from './data'
  import { notifications } from '../notifications'
  import ConfirmDelete from '../ConfirmDelete.svelte'

  export let open = false
  export let group = {}
  let loading = false
  let errors = ''

  const handleDelete = async () => {
    const { id, name } = group
    loading = true
    try {
      await groups.remove(id)
      open = false
      notifications.add({ text: `${name} class deleted`, type: 'success' })
    } catch (error) {
      errors = error
      notifications.add({
        text: `Could not delete ${name} class`, type: 'danger'
      })
    } finally {
      loading = false
    }
  }

</script>

<ConfirmDelete name="group" on:delete={handleDelete} {errors} {loading} bind:open>
  <span>
    {group.name} class
  </span>
</ConfirmDelete>