<script>
  import { lessons } from './data'
</script>

<style>
  .lesson-list {
    padding: 1rem;
  }
</style>

<section class="lesson-list">
  {#if $lessons}
    {#each $lessons as lesson (lesson.id)}
      <li><a href="#/lesson/{lesson.id}">{lesson.name}</a>
      {#if lesson.tags.length > 0}
        {#each lesson.tags as tag (tag.id)}
          <span class="tag">{tag.name}</span>
        {/each}
      {/if}
      </li>
    {/each}
  {/if}
</section>