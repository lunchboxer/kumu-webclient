<script>
  import { tags } from './data'
  import { notifications } from '../notifications'
  import ConfirmDelete from '../ConfirmDelete.svelte'

  export let deleteTag
  let errors = ''
  let loading = false

  const handleDelete = async () => {
    loading = true
    try {
      await tags.remove(deleteTag.id)
      notifications.add({ text: `Tag '${deleteTag.name}' deleted`, type: 'success' })
      deleteTag = null
    } catch (error) {
      errors = error
      notifications.add({
        text: `Could not delete tag '${deleteTag.name}'`, type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

{#if deleteTag}
<ConfirmDelete name="tag" on:delete={handleDelete} {errors} {loading} bind:open={deleteTag}>
  the tag '{deleteTag.name}'
</ConfirmDelete>
{/if}