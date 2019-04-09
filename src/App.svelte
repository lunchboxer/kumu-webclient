<script>
  import { NotificationList } from './components/notifications'
  import { auth } from './data/auth'
  import Router from './components/Router.svelte'
  import Login from './components/Login.svelte'
  import Navbar from './components/Navbar.svelte'

  let active = '/'
</script>

<style>
  main {
    height: 100%;
    padding: 1rem;
    margin: 0;
  }
</style>

<div>
  <Navbar {active} />

  <main>

    {#if $auth.username}
      <Router bind:active />
    {:else}
      <Login/>
    {/if}
        
  </main>
  
  <NotificationList/>
</div>