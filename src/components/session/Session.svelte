<script>
  import { onMount } from 'svelte'
  import { session, sessionId } from './data'
  import Loading from '../Loading.svelte'
  import NotFound from '../NotFound.svelte'
  import { ws } from '../../data/ws-client2'
  import { request } from '../../data/fetch-client'
  import { CLASS_SESSION, CLASS_SESSION_SUB } from './queries'
  import { ACTIVATE_SESSION } from './mutations'
  import ActiveSession from './ActiveSession.svelte'
  import SessionActivator from './SessionActivator.svelte'

  export let params

  onMount(() => {
    if (!params || !params.id) return
    sessionId.set(params.id)
    request(CLASS_SESSION, { id: params.id })
      .then(response => {
        request(ACTIVATE_SESSION, { id: params.id })
        session.set(response.classSession)
      })
    const subscription = ws.request({ query: CLASS_SESSION_SUB, variables: { id: $sessionId } })
      .subscribe({
        next (message) {
          if (message.data && message.data.classSession) {
            session.set(message.data.classSession)
          }
        }
      })
    return () => {
      subscription && subscription.unsubscribe()
    }
  })
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