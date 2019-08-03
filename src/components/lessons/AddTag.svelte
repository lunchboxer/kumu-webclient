<script>
  import { onMount } from 'svelte'
  import { tags } from '../tags/data'
  import { lessons } from './data'
  import { notifications } from '../notifications'

  export let lesson
  let otherTags = []
  let toAdd

  onMount(async () => {
    if (!$tags) {
      await tags.get()
    }
    if ($tags.length > 0) {
      const currentTags = lesson.tags.map(t => t.id)
      otherTags = $tags.filter(t => !currentTags.includes(t.id))
    }
  })

  const add = async () => {
    if (!toAdd) return
    const input = { tags: { connect: { id: toAdd } } }
    try {
      await lessons.patch({ input, id: lesson.id })
      notifications.add({ text: 'Added tag to lesson', type: 'success' })
    } catch (error) {
      console.error(error)
      notifications.add({ text: "Couldn't add tag to lesson", type: 'danger' })
    }
  }
</script>

{#if otherTags}
<div class="select">
    <select bind:value={toAdd} on:change={add}>
      <option value="">Add a tag</option>
      {#each otherTags as tag (tag.id)}
        <option value={tag.id}>{tag.name}</option>
        {/each}
    </select>
  </div>
{/if}