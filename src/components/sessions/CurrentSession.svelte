<script>
  import { formatDistance } from 'date-fns'
  import { todaysSessions } from './data'
  import Error from '../Error.svelte'
  import Warning from '../Warning.svelte'
  import Loading from '../Loading.svelte'
  import DL from '../DL.svelte'

  const dateString = (date) => {
    const dateTime = new Date(date)
    return formatDistance(dateTime, new Date(), { addSuffix: true })
  }
</script>

{#if $todaysSessions && $todaysSessions.now}
  <Warning title="{$todaysSessions.now.group.name} class is on right now!">
    <DL>
      <dt>Started:</dt>
      <dd>{dateString($todaysSessions.now.startsAt)}</dd>
      <dt>Ends:</dt>
      <dd>{dateString($todaysSessions.now.endsAt)}</dd>
      <dt>Status:</dt>
      <dd>{$todaysSessions.now.stage}</dd>
    </DL>
  </Warning>
  {/if}