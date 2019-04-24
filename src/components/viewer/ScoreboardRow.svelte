<script>
  import { fly, fade } from 'svelte/transition'
  import { points } from './data'
  import Star from './Star.svelte'
  export let student
  export let sessionId

  $: pointsTally = $points ? $points.reduce((sum, point) => {
    if (point.student.id !== student.id) return sum
    return sum + point.value
  }, 0) : 0
</script>

<style>
  li {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .name {
    font-size: 4rem;
    margin: 1rem;
    width: 15rem;
  }

  .absent {
    color: rgba(140, 140, 140, 0.5);
  }
</style>

<li>
  <span class="name" class:absent={!student.attendance || student.attendance.status==="Absent" }>
    {student.englishName || student.chineseName}
  </span>
  {#if student.attendance && student.attendance.status !== "Absent"}
  {#each {length: pointsTally} as point, i}
    <div in:fly="{{x:-400}}" out:fade >
      <Star index={i} size="5rem" />
    </div>
  {/each}
  {/if}
</li>