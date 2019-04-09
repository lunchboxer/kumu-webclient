<script>
  import { format, formatRelative } from 'date-fns'
  import { sessions } from './data'
  import { notifications } from '../notifications'
  import SessionForm from './SessionForm.svelte'

  let errors = ''
  let loading = false
  export let open = false
  export let session = {}

  $: startsAtLocal = format(new Date(session.startsAt), "yyyy-MM-dd'T'HH:mm")
  $: endsAtLocal = format(new Date(session.endsAt), "yyyy-MM-dd'T'HH:mm")
  const reset = () => {
    errors = ''
    open = false
  }

  const save = async ({ detail }) => {
    const { id, groupId, ...input } = detail
    input.startsAt = new Date(input.startsAt).toISOString()
    input.endsAt = new Date(input.endsAt).toISOString()
    loading = true
    try {
      const updatedSession = await sessions.update(id, input, groupId)
      const date = formatRelative(new Date(input.startsAt), new Date(), { addSuffix: true })
      notifications.add({ text: `Update session to ${date} with ${updatedSession.group.name} class`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({ text: 'Could save changes to session', type: 'danger' })
    } finally {
      loading = false
    }
  }
</script>
<SessionForm {errors} on:submit={save} on:reset={reset} groupId={session.group.id} startsAt={startsAtLocal}
  endsAt={endsAtLocal} id={session.id} {loading} />