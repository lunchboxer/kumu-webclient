<script>
  import { session } from '../session/data'
  import { time } from '../../data/timer'
  import { formatDistance } from 'date-fns'
  $: endedDistance = formatDistance(new Date($session.endedAt), new Date($time), { addSuffix: true })

</script>

<h2 class="title">{$session.group.name} class lesson {$session.number}</h2>

<p class="subtitle">Ended {endedDistance}</p>