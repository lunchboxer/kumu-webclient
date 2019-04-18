<script>
  import { session, sessionId } from './data'
  import Loading from '../Loading.svelte'
  import NotFound from '../NotFound.svelte'
  import ActiveSession from './ActiveSession.svelte'
  import SessionActivator from './SessionActivator.svelte'

  export let params

  $: if (params && params.id) {
    sessionId.set(params.id)
  }
</script>

{#if $session}

{#if $session.stage === "Inactive"}
  <SessionActivator id={params.id} />
{/if}
{#if $session.stage === "Active"}
  <ActiveSession />
{/if}

{:else if $session && $session.classSession === null}
<NotFound />
{:else}
<Loading what="class session"/>
{/if}