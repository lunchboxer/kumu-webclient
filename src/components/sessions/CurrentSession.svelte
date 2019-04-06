<script>
  import { todaysSessions } from './data'
  import Error from '../Error'
  import Warning from '../Warning'
  import Loading from '../Loading'
  import DL from '../DL'
  import { formatDistance } from 'date-fns'

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