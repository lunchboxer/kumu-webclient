<script>
  export let words = []
</script>

<style>
  section {
    margin: 0.5rem;
    padding: 0.5rem;
  }
</style>

<section class="word-list">
  {#if words.length > 0}
    {#each words as word (word.id)}
      <li><a href="#/word/{word.id}">{word.english} ({word.chinese})</a>
        {#if word.tags && word.tags.length > 0}
          {#each word.tags as tag (tag.id)}
            <span class="tag">{tag.name}</span>
          {/each}
        {/if}
      </li>
    {/each}
  {/if}
</section>