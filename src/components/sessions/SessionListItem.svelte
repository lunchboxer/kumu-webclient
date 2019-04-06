<script>
  import { formatDistance, format, formatRelative } from 'date-fns'
  import DeleteSession from './DeleteSession'
  import EditSession from './EditSession'
  import Modal from '../Modal'

  export let session
  export let time
  let showDelete = false
  let showEdit = false
  let showActions = false

  const relativeDate = (date) => {
    if (!date) return
    return formatDistance(new Date(date), new Date(), { addSuffix: true })
  }

  const formatTime = (time) => {
    if (!time) return
    return format(new Date(time), 'p')
  }

  const maybeDate = (date) => {
    const timeDiff = (new Date(date) - new Date())
    if (Math.abs(timeDiff) > 8.64e7) { // more than a day ago
      const dateString = formatRelative(new Date(date), new Date())
      return ['AM', 'PM'].includes(dateString.slice(-2))
        ? dateString
        : `${dateString} ${formatTime(date)}`
    }
    return ''
  }
</script>
<style>
  li {
    list-style: none;
    margin: 1rem;
  }

  li.is-active {
    background: #222;
    padding: 0.4rem 0.8rem 0.4rem 0.8rem;
    margin: -0.4rem 0.2rem;
  }
</style>

{#if session}
<li class:is-active={showActions}>
  <span on:click={() => showActions = !showActions}>
    {session.group.name} class {relativeDate(session.startsAt)}, {maybeDate(session.startsAt) || formatTime(session.startsAt)} to {formatTime(session.endsAt)}
  </span>
  {#if showActions}
  <div class="buttons">
    <button class="button">Go view</button>
    <button class="button" on:click={()=> showEdit = true}>Edit</button>
    <button class="button" on:click={()=> showDelete = true}>Delete</button>
  </div>
  {/if}
  </li>
{/if}

<Modal bind:open={showDelete}>
  {#if showDelete}
    <DeleteSession {session} bind:open={showDelete} />
  {/if}
</Modal>

<Modal bind:open={showEdit}>
  {#if showEdit}
    <EditSession {session} bind:open={showEdit} />
  {/if}
</Modal>