<script>
  import { formatDistance, format, formatRelative } from 'date-fns'

  export let session
  export let time
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
        : `${dateString} ${formatTime(time)}`
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
    <button class="button">Edit</button>
    <button class="button">Delete</button>
  </div>
  {/if}
  </li>
{/if}