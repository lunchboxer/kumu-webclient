<script>
  import { push } from 'svelte-spa-router'
  import ConfirmDelete from '../ConfirmDelete.svelte'
  import { lessons } from './data'
  import { notifications } from '../notifications'
  import Modal from '../Modal.svelte'

  export let lesson = {}
  let open = false
  let errors = ''
  let loading = false

  const handleDelete = async () => {
    loading = true
    try {
      await lessons.remove(lesson.id)
      open = false
      notifications.add({ text: `lesson '${lesson.name}' deleted`, type: 'success' })
      push('/lessons')
    } catch (error) {
      errors = error
      notifications.add({
        text: `Could not delete student '${lesson.name}'`, type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

<button class="button is-danger" on:click={() => { open = true }}><i class="fas fa-trash"></i>Delete</button>

<Modal bind:open>
  {#if open}
  <ConfirmDelete name="lesson" on:delete={handleDelete} {errors} {loading} bind:open>
    the lesson named '{lesson.name}'
  </ConfirmDelete>
  {/if}
</Modal>