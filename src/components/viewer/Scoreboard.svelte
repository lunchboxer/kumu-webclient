<script>
  import { onMount } from 'svelte'
  import { ws } from '../../data/ws-client'
  import { session, sessionStudents, sessionId } from '../session/data'
  import { points } from './data'
  import ScoreboardRow from './ScoreboardRow.svelte'
  import { POINTS_SUB } from '../session/queries'

  onMount(() => {
    const subscription = ws.request({ query: POINTS_SUB, variables: { classSessionId: $session.id } })
      .subscribe({
        next (message) {
          if (message.data && message.data.points) {
            const { node, mutation, previousValues } = message.data.points
            if (mutation === 'CREATED') pointAdded(node)
            if (mutation === 'DELETED') {
              points.update(previous => {
                return previous.filter(point => point.id !== previousValues.id)
              })
            }
          }
        }
      })
    return () => subscription && subscription.unsubscribe()
  })

  const pointAdded = (point) => {
    if (point.value > 0) {
      const yay = new Audio('ui-confirmation-alert-a5min.wav')
      yay.play()
    } else {
      const boo = new Audio('quick-fart.wav')
      boo.play()
    }

    points.update(previous => {
      return [point, ...previous]
    })
  }
</script>

<style>
  section {
    height: calc(100vh - 5rem);
  }

  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>

<audio preload>
  <source type='audio/wav' src='ui-confirmation-alert-a5min.wav'>
</audio>
<audio preload>
  <source type='audio/wav' src='quick-fart.wav'>
</audio>

<h2 class="title">{$session.group.name} class lesson {$session.number}</h2>

{#if $sessionStudents}
<section class="scoreboard">
  <ul>
    {#each $sessionStudents as student (student.id)}
      <ScoreboardRow {student} sessionId={$sessionId} />
    {/each}
    </ul>
</section>
{/if}