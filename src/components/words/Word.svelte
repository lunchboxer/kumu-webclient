<script>
  import { onMount } from 'svelte'
  import { notifications } from '../notifications'
  import { word } from './data'
  import Error from '../Error.svelte'
  import Loading from '../Loading.svelte'
  import ItemTagList from '../tags/ItemTagList.svelte'

  export let params = {}
  let errors = ''

  onMount(async () => {
    if (!$word || $word.id !== params.id) {
      try {
        await word.get(params.id)
      } catch (error) {
        errors = error
        notifications.add({ text: 'Could not fetch word from the server', type: 'danger' })
      }
    }
  })
</script>

<style>
  section {
    margin: 1rem;
  }
</style>

<svelte:head>
  <title>Word Details</title>
</svelte:head>

{#if errors}
    <Error {errors} />
  {/if}
  
  {#if $word && $word.id === params.id}
    <h1 class="title">{$word.english}</h1>
  
    <ItemTagList type="words" item={$word} store={word} />
  
    <section class="details">
      <h2 class="title is-4">Used in {$word.lessons.length} Lessons</h2>
      {#if $word.lessons && $word.lessons.length > 0}
        {#each $word.lessons as lesson (lesson.id)}
          <li><a href="#/lesson/{lesson.id}">{lesson.name}</a></li>
        {/each}
      {/if}
    </section>
  
  {:else if !errors}
    <Loading what="word"/>
  {/if}