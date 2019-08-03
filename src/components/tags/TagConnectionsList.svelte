<script>
  import { onMount } from 'svelte'
  import { notifications } from '../notifications'
  import { tag } from './data'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'

  export let id
  let errors = ''

  onMount(async () => {
    if ($tag || $tag.id !== id) {
      try {
        await tag.get()
      } catch (error) {
        errors = error
        notifications.add({ text: 'Could not get related items from server', type: 'danger' })
      }
    }
  })
</script>

<Error {errors} />

{#if $tag && $tag.id === id}

  {#if $tag.materials.length > 0}
    <h2 class="title is-4">Materials</h2>
    {#each $tag.materials as material (material.id)}
      <a href="#/material/{material.id}">{material.title}</a>
    {/each}
  {/if}

  {#if $tag.lessons.length > 0}
    <h2 class="title is-4">Lessons</h2>
    {#each $tag.lessons as lesson (lesson.id)}
      <a href="#/lesson/{lesson.id}">{lesson.name}</a>
    {/each}
  {/if}

  {#if $tag.words.length > 0}
    <h2 class="title is-4">Words</h2>
    {#each $tag.words as word (word.id)}
      <a href="#/word/{word.id}">{word.english}</a>
    {/each}
  {/if}

{:else if !errors}
  <Loading what="connections"/>
{/if}