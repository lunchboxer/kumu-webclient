<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { auth } from './data/auth'
  import Login from './components/Login'
  // import Semesters from "./components/semesters/Semesters"
  import Students from './components/students/Students'
  import Navbar from './components/Navbar'
  import { NotificationList } from './components/notifications'
</script>

<style>
  main {
    height: 100%;
    padding: 1rem;
    margin: 0;
  }
</style>

<div>
  <Navbar />

  <main>

    {#if $auth.username}
    <Students />
      <!-- <Semesters /> -->
    {:else}
      <Login/>
    {/if}
        
  </main>
  
  <NotificationList/>
</div>