<script>
  import { notifications } from '../notifications'

  export let item
  export let store
  export let type = ''
  let newTag = ''

  const add = async () => {
    if (!newTag) return
    const input = { tags: { create: { name: newTag } } }
    try {
      await store.patch({ input, id: item.id })
      notifications.add({ text: 'Added tag to item', type: 'success' })
      newTag = ''
    } catch (error) {
      console.error(error)
      notifications.add({ text: "Couldn't add tag to item", type: 'danger' })
    }
  }
</script>

<style>
  .field {
    margin: 0.5rem;
  }

  input {
    width: 15rem;
  }

  .button {
    border-radius: 0 4px 4px 0;
  }
</style>

<div class="field has-addons">
  <div class="control new has-icons-left">
    <input class="input" type="text" bind:value={newTag} on:change={add} placeholder="new tag">
    <span class="icon is-small is-left">
      <i class="fas fa-tag"></i>
    </span>
  </div>
  <button class="button is-success" on:click={add}>add</button>
</div>