<script>
  import { onMount } from 'svelte'
  import { tags } from './data'
  import { notifications } from '../notifications'

  export let item
  export let store
  export let type = ''
  let toAdd

  onMount(async () => {
    if (!$tags) {
      await tags.get()
    }
  })

  $: currentTags = item.tags.length > 0 ? item.tags.map(t => t.id) : []
  $: otherTags = ($tags && $tags.length > 0) ? $tags.filter(t => !currentTags.includes(t.id)) : []

  const add = async () => {
    if (!toAdd) return
    const input = {}
    input[type] = { connect: { id: item.id } }
    try {
      const newTag = await tags.patch({ input, id: toAdd })
      store.update(previous => {
        return { ...previous, tags: [...previous.tags, newTag] }
      })
      notifications.add({ text: 'Added tag to item', type: 'success' })
    } catch (error) {
      console.error(error)
      notifications.add({ text: "Couldn't add tag to item", type: 'danger' })
    }
  }
</script>

<style>
  .select {
    margin: 0.5rem 0.5rem 0.5rem 0;
  }
</style>

{#if otherTags}
<div class="select">
    <select bind:value={toAdd} on:change={add}>
      <option value="">Add existing tag</option>
      {#each otherTags as tag (tag.id)}
        <option value={tag.id}>{tag.name}</option>
        {/each}
    </select>
  </div>
{/if}