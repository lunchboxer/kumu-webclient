<script>
  import Navaid from 'navaid';
  import { onMount, onDestroy } from 'svelte'

  let Route, params
  export let active
  export let uri = location.pathname;

  $: active = uri.split('/')[1] || '/';

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
  const router = Navaid('/', () => import('./NotFound.svelte').then(draw))
    .on('/', () => import('./dashboard/Dashboard.svelte').then(draw))
    .on('/semesters', () => import('./semesters/Semesters.svelte').then(draw))
    .on('/students', () => import('./students/Students.svelte').then(draw))
    .on('/groups', () => import('./groups/Groups.svelte').then(draw))
    .on('/sessions', () => import('./sessions/Sessions.svelte').then(draw))
    .on('/session/:id', obj => import('./session/Session.svelte').then(m => draw(m, obj)))
    .on('/lessons', () => import('./lessons/Lessons.svelte').then(draw))
    .on('/materials', () => import('./materials/Materials.svelte').then(draw))
    .on('/words', () => import('./words/Words.svelte').then(draw))
    .on('/tags', () => import('./tags/Tags.svelte').then(draw))
    .on('/me', () => import('./profile/Profile.svelte').then(draw))
    .on('/viewer', () => import('./viewer/Viewer.svelte').then(draw))
    .listen();
  onDestroy(router.unlisten);
</script>

<svelte:component this={Route} {params} />