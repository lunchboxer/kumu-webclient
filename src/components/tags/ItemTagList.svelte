<script>
  import AddTagToItem from './AddTagToItem.svelte'
  import TagOnItem from './TagOnItem.svelte'
  import AddNewTagToItem from './AddNewTagToItem.svelte'

  export let item
  export let store
  export let type

  console.log(store)
</script>

<style>
  .tag-inputs {
    display: flex;
  }
</style>

{#if item.tags && item.tags.length > 0}
  <div class="tags">
    {#each item.tags as tag (tag.id)}
      <TagOnItem {tag} itemId={item.id} {store} {type} />
    {/each}
  </div>
{/if}
  
<div class="tag-inputs">
<AddTagToItem {item} {type} {store} />

<AddNewTagToItem {item} {type} {store} />
</div>