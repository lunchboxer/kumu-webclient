<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { semesters } from "./data";
  import { notifications } from '../notifications'
  import SemesterList from './SemesterList'
  import AddSemester from './AddSemester'
  import Error from '../Error'
  import Loading from '../Loading'

  let showAddForm = false
  let errors = ""
  onMount(async () => {
    try {
      await semesters.get();
    } catch (error) {
      errors = error
      notifications.add({ text: "Couldn't get semesters from server.", type: "danger" })
    }
  });
</script>

<svelte:head>
  <title>Semesters</title>
</svelte:head>

<h1 class="title">Semesters</h1>

<Error {errors} />

{#if $semesters}
<AddSemester/>
<SemesterList/>
{:else if !errors}
<Loading what="semesters"/>
{/if}