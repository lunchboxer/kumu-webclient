<script>
  import Router from './components/Router'
  import { auth } from './data/auth'
  import Login from './components/Login'
  import Navbar from './components/Navbar'
  import { NotificationList } from './components/notifications'

  let active = "/"
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