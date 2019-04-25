<script>
  import { NotificationList } from './components/notifications'
  import { auth } from './data/auth'
  import Router from './components/Router.svelte'
  import Login from './components/Login.svelte'
  import Navbar from './components/Navbar.svelte'
  import CurrentSession from './components/sessions/CurrentSession.svelte'

  let active = '/'
  let uri = location.pathname

</script>

<style>
  main {
    height: calc(100% - 5rem);
    padding: 1rem;
    margin: 0;
  }
</style>

{#if active !== 'viewer'}
<Navbar {active} />
{/if}

<main>

  {#if $auth.username}
    {#if active !== "viewer"}
      <CurrentSession {active} {uri}/>
    {/if}
    <Router bind:active bind:uri/>
  {:else}
    <Login/>
  {/if}
        
  </main>
  
  {#if active !== "viewer"}
  <NotificationList/>
  {/if}