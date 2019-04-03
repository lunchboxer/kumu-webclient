<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { students } from "./data";
  import { notifications } from '../notifications'
  import Error from '../Error'
  import Loading from '../Loading'
  import StudentList from './StudentList'

  let errors

  onMount(async () => {
    try {
      await students.get();
    } catch (error) {
      errors = error
      notifications.add({ text: "Couldn't get students from server.", type: "danger" })
    }
  });
</script>

<svelte:head>
  <title>Students</title>
</svelte:head>

<h1 class="title">Students</h1>

{#if $students}
  <StudentList />
{:else if !errors}
  <Loading what="students"/>
{:else}
  <Error {errors} />
{/if}