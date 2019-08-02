<script>
  import { lessons } from './data'
  import { notifications } from '../notifications'
  import LessonForm from './LessonForm.svelte'

  let loading = false
  let errors = ''
  let open = false

  const reset = () => {
    errors = ''
    open = false
  }

  const save = async ({ detail }) => {
    loading = true
    console.log(detail)
    try {
      // await lessons.create(detail)
      notifications.add({ text: `Saved new lesson '${detail.name}'`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not save new lesson.',
        type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

{#if open}
  <LessonForm on:reset={reset} on:submit={save} {errors} {loading} />

  {:else}
  <button class="button is-primary" on:click={() => { open = true }}>
      <i class="fas fa-plus"></i>Create new lesson
    </button>
{/if}