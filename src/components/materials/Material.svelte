<script>
  import { onMount } from 'svelte'
  import { push } from 'svelte-spa-router'
  import { notifications } from '../notifications'
  import { material } from './data'
  import Error from '../Error.svelte'
  import Loading from '../Loading.svelte'
  import ItemTagList from '../tags/ItemTagList.svelte'

  export let params = {}
  let errors = ''

  onMount(async () => {
    if (!$material || $material.id !== params.id) {
      try {
        await material.get(params.id)
        if ($material === null) push(`/not-found/material/${params.id}`)
      } catch (error) {
        errors = error
        notifications.add({ text: 'Could not fetch material from the server', type: 'danger' })
      }
    }
  })
</script>

<style>
  :global(.details p) {
    margin: 1rem 0 1rem;
    max-width: 700px;
  }

  .title.is-4 {
    margin-top: 1.5rem;
  }

  section {
    margin: 1rem;
  }
</style>

<svelte:head>
  <title>Material Details</title>
</svelte:head>

{#if errors}
  <Error {errors} />
{/if}

{#if $material && $material.id === params.id}
  <h1 class="title">{$material.title}</h1>

  <ItemTagList item={$material} type="materials" store={material} />

  <section class="details">
    
  </section>

{:else if !errors}
  <Loading what="Material"/>
{/if}