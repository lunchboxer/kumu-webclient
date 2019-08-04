<script>
  import { onMount } from 'svelte'
  import { notifications } from '../notifications'
  import { lesson } from './data'
  import marked from 'marked'
  import Error from '../Error.svelte'
  import Loading from '../Loading.svelte'
  import DeleteLesson from './DeleteLesson.svelte'
  import ItemTagList from '../tags/ItemTagList.svelte'

  export let params = {}
  let errors = ''

  onMount(async () => {
    if (!$lesson || $lesson.id !== params.id) {
      try {
        await lesson.get(params.id)
      } catch (error) {
        errors = error
        notifications.add({ text: 'Could not fetch lesson from the server', type: 'danger' })
      }
    }
  })
</script>

<style>
  :global(.summaries p) {
    margin: 1rem 0 1rem;
    max-width: 700px;
  }

  .title.is-4 {
    margin-top: 1.5rem;
  }

  section {
    margin: 1rem;
  }
</style>

<svelte:head>
  <title>Lesson Details</title>
</svelte:head>

{#if errors}
  <Error {errors} />
{/if}

{#if $lesson && $lesson.id === params.id}
  <h1 class="title">{$lesson.name}</h1>

  <ItemTagList item={$lesson} type="lessons" store={lesson} />

  <section class="summaries">
    <h2 class="title is-4">Lesson Summary</h2>
    <h3 class="subtitle">English</h3>
    {@html marked($lesson.summaryEN, { breaks: true })}
  
    <h2 class="title is-4">Homework</h2>
    <h3 class="subtitle">English</h3>
    {@html marked($lesson.homeworkEN, { breaks: true })}

    <h2 class="title is-4">Lesson Summary</h2>
    <h3 class="subtitle">Chinese</h3>
    {@html marked($lesson.summaryZH, { breaks: true })}
  
    <h2 class="title is-4">Homework</h2>
    <h3 class="subtitle">Chinese</h3>
    {@html marked($lesson.homeworkZH, { breaks: true })}
  </section>
  
  <section class="buttons">
    <a class="button is-primary" href="#/edit-lesson/{$lesson.id}"><i class="fas fa-edit"></i>Edit</a>
    <DeleteLesson lesson={$lesson} />
  </section>

{:else if !errors}
  <Loading what="Lesson"/>
{/if}