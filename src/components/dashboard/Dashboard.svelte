<script>
  import { todaysSessions } from '../sessions/data'

  $: console.log($todaysSessions)

</script>
<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<h1 class="title">Dashboard</h1>