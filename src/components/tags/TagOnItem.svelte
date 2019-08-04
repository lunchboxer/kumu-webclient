<script>
  import { tags } from './data'
  import { notifications } from '../notifications'

  export let tag
  export let store
  export let type
  export let itemId

  const remove = async () => {
    const input = {}
    input[type] = { disconnect: { id: itemId } }
    try {
      await tags.patch({ input, id: tag.id })
      store.update(previous => {
        const tags = previous.tags.filter(t => t.id !== tag.id)
        return { ...previous, tags }
      })
      notifications.add({
        text: `Removed tag '${tag.name}' from the item`,
        type: 'success'
      })
    } catch (error) {
      console.error(error)
      notifications.add({ text: `Could not remove tag '${tag.name}'`, type: 'danger' })
    }
  }
</script>

<span class="tag is-dark">
  {tag.name}
  <button class="delete is-small" on:click={remove}></button>
</span>