<script>
  import { lessons } from './data'
  import { notifications } from '../notifications'

  export let tag
  export let lessonId

  const remove = async () => {
    const input = { tags: { disconnect: { id: tag.id } } }
    try {
      await lessons.patch({ input, id: lessonId })
      notifications.add({
        text: `Removed tag '${tag.name}' from the lesson`,
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