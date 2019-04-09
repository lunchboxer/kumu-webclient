<script>
  import { createEventDispatcher } from 'svelte'
  import { notifications } from '../notifications'
  import { semester } from './data'
  import Input from '../Input.svelte'
  import Error from '../Error.svelte'
  import SemesterSelect from './SemesterSelect.svelte'
  import GroupSelect from '../GroupSelect.svelte'

  const dispatch = createEventDispatcher()

  export let errors
  export let loading = false
  let form
  let saveButton
  export let id = ''
  export let groupId = ''
  export let startsAt = ''
  export let endsAt = ''

  const handleSubmit = () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger'
      })
      return
    }
    dispatch('submit', { id, groupId, startsAt, endsAt })
  }
</script>

<h2 class="title">{#if id}Edit{:else}Add{/if} a class session</h2>
<Error {errors} />
<form novalidate bind:this={form} on:submit|preventDefault={handleSubmit} on:reset>
  <Input label="Start time" type="datetime-local" bind:value={startsAt} required />
  <Input label="End time" type="datetime-local" bind:value={endsAt} required />
 <label class="label">
   Semester & Group
 </label>
  <SemesterSelect />
  {#if $semester}
  <GroupSelect bind:groupId groups={$semester.groups} required />
  {/if}
  <div class="buttons">
      <button class="button is-primary" bind:this={saveButton} type="submit">Save</button>
      <input class="button" type="reset" value="Cancel" />
  </div>
 
</form>