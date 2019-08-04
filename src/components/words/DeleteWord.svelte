<script>
  import { push } from 'svelte-spa-router'
  import { words } from './data'
  import { notifications } from '../notifications'
  import ConfirmDelete from '../ConfirmDelete.svelte'
  import Modal from '../Modal.svelte'

  export let word
  let errors = ''
  let loading = false
  let open = false

  const handleDelete = async () => {
    loading = true
    try {
      await words.remove(word.id)
      notifications.add({ text: `Word '${word.english}' deleted`, type: 'success' })
      push('/words')
    } catch (error) {
      errors = error
      console.error(error)
      notifications.add({
        text: `Could not delete word '${word.english}'`, type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

<button class="button is-danger" on:click={() => { open = true }}><i class="fas fa-trash"></i>Delete</button>

<Modal bind:open>
  <ConfirmDelete name="word" on:delete={handleDelete} {errors} {loading} bind:open>
    the word '{word.english}'
  </ConfirmDelete>
</Modal>