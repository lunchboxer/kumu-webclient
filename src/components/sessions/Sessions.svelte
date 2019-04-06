<script>
  import { onMount, onDestroy } from 'svelte'
  import Upcoming from './UpcomingSessions'
  import SessionsList from './SessionsList'
  import CurrentSession from './CurrentSession'

  let activeComponent = Upcoming
  let active = 'upcoming'
  let where = null

  const switchTab = (tab) => {
    active = tab

    if (tab === 'past') {
      where = { endsAt_lt: new Date().toISOString() }
    } else if (tab === 'future') {
      where = { startsAt_gt: new Date().toISOString() }
    } else if (tab === 'all') {
      where = null
    }
    activeComponent = tab === 'upcoming' ? Upcoming : SessionsList
  }
</script>

<style>
  .add-button {
    margin-bottom: 1rem;
  }

  nav .button.is-outlined:hover {
    color: white;
    background: inherit;
  }
</style>

<svelte:head>
  <title>Class schedule</title>
</svelte:head>

<h1 class="title">
  Class schedule
</h1>

<CurrentSession />

<button class="button add-button is-primary"><i class="fas fa-plus"></i>&nbsp;Add a session</button>

<nav class="buttons has-addons is-centered">
  <button class="button is-link" class:is-outlined={active!=='upcoming' } on:click={()=>
    switchTab('upcoming')}>Upcoming</button>
  <button class="button is-link" class:is-outlined={active!=='past' } on:click={()=> switchTab('past')
    }>Past</button>
  <button class="button is-link" class:is-outlined={active!=='future' } on:click={()=>
    switchTab('future')}>Future</button>
  <button class="button is-link" class:is-outlined={active!=='all' } on:click={()=> switchTab('all')}>All</button>
</nav>

<svelte:component this={activeComponent} bind:where />