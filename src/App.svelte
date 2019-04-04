<script>
  import Navaid from 'navaid';
  import { onMount, onDestroy } from 'svelte'
  import { auth } from './data/auth'
  import Login from './components/Login'
  // import Semesters from "./components/semesters/Semesters"
  // import Students from './components/students/Students'
  // import Groups from './components/groups/Groups'
  // import Sessions from './components/sessions/Sessions'
  import Navbar from './components/Navbar'
  import { NotificationList } from './components/notifications'

  let Route, params, active;
  let uri = location.pathname;
  $: active = uri.split('/')[1] || 'home';

  function draw(m, obj) {
    params = obj || {};
    if (m.preload) {
      m.preload({ params }).then(() => {
        Route = m.default;
      });
    } else {
      Route = m.default;
    }
  }
  function track(obj) {
    uri = obj.state || obj.uri;
    if (window.ga) ga.send('pageview', { dp: uri });
  }
  addEventListener('replacestate', track);
  addEventListener('pushstate', track);
  addEventListener('popstate', track);
  const router = Navaid('/', () => import('./components/404.svelte').then(draw))
    .on('/', () => import('./routes/Home.svelte').then(draw))
    .on('/semesters', () => import('./components/semesters/Semesters.svelte').then(draw))
    .on('/students', () => import('./components/students/Students.svelte').then(draw))
    .on('/groups', () => import('./components/groups/Groups.svelte').then(draw))
    .on('/me', () => import('./components/profile/Profile.svelte').then(draw))
    .listen();
  onDestroy(router.unlisten);
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
      <svelte:component this={Route} {params}/>
    {:else}
      <Login/>
    {/if}
        
  </main>
  
  <NotificationList/>
</div>