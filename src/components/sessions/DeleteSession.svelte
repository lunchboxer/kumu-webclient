<script>
  import { sessions } from './data'
  import { notifications } from '../notifications'
  import Error from '../Error'
  import { formatRelative } from 'date-fns'

  let deleteButton
  export let open = false
  export let session = {}
  let loading = false
  let errors = ""

  const handleDelete = async () => {
    deleteButton.disabled = true
    try {
      await sessions.remove(session.id)
      open = false
      notifications.add({ text: `Session deleted`, type: "success" })
    } catch (error) {
      errors = error
      notifications.add({
        text: `Could not delete session'`, type: "danger"
      })
    }
  }
  const close = () => open = false
  const dateString = (date) => {
    return formatRelative(new Date(date), new Date())
  }
</script>

<style>
  .buttons {
    float: right;
    padding: 1rem;
  }
</style>
<h1 class="title">Delete session</h1>
<Error {errors} />
<p>Permanently delete the session which takes place {dateString(session.startsAt)}
  with
  {session.group.name} class?
</p>
<div class="buttons">
  <button class="button is-primary" bind:this={deleteButton} on:click={handleDelete}>Delete</button>
  <button class="button" on:click={close}>Keep it</button>
</div>