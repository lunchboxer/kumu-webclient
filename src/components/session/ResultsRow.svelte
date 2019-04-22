<script>
  export let result = {}

  const pointsTally = ('0' + result.pointsTally).slice(-2)
</script>

<style>
  .absent {
    color: #bbb;
  }
</style>

<li>
  {#if result.status !== "Absent"}
  <span class="stars"><i class="fas fa-star"></i>&times;{pointsTally}</span>
  {/if}

  <span class="name" class:absent={result.status === "Absent"}>{result.student.englishName || result.student.chineseName}</span>

  <span class="status">
    {#if result.status !== "Present"}
      {result.status}
    {/if}
  </span>
</li>