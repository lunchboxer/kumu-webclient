<script>
  import { session } from '../session/data'
  import CreateReport from './CreateReport.svelte'
  import EditReport from './EditReport.svelte'
  import DeleteReport from './DeleteReport.svelte'
</script>

<style>
  section {
    margin: 1rem 0;
  }
</style>

<section class="report">
  <h3 class="title is-4">Report</h3>
  {#if !$session.lesson}
      <p>A lesson must be added before a report can be created.</p>
    {:else if $session && !$session.report}
      <p>No report exists for this session.</p>
      <CreateReport />
    {:else}
      <!-- show the detials of the report here -->
      <EditReport />
      <DeleteReport />
    {/if}
</section>