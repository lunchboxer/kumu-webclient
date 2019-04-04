<script>
  import { fly } from 'svelte/transition'
  import Modal from '../Modal'
  import EditGroup from './EditGroup'
  import DeleteGroup from './DeleteGroup'
  export let group
  let editShowing = false
  let deleteShowing = false
</script>

<style>
  .student-list {
    margin-left: 1rem;
  }

  .card {
    min-width: 200px;
    margin: 0.3rem;
    display: flex;
    border-radius: 4px;
    flex-direction: column;
    justify-content: space-between;
  }

  @media only screen and (max-width: 510px) {
    .card {
      width: 100%;
    }
  }

  footer button {
    border: none;
    background: transparent;
    color: #14a098;
    cursor: pointer;
    font-size: 1rem;
  }

  footer button:hover {
    color: #cb2d6f;
    background: #2f2f2f;
  }
</style>

<li class="card" in:fly="{{x: 400}}" out:fly="{{x: -400}}">
  <div class="card-content">
    <span class="title is-4">{group.name} class</span> {group.semester.name} ({group.students.length} students)
    {#if group.students && group.students.length}
        <ul class="student-list">
        {#each group.students as student}
          <li>{student.chineseName} {student.englishName}</li>
        {/each}
        </ul>
      {/if}
  </div>
  
  <footer class="card-footer">
    <button class="card-footer-item" on:click={() => editShowing = true}>Edit</button>
    <button class="card-footer-item" on:click={() => deleteShowing = true}>Delete</button>
  </footer>
</li>

<Modal bind:open={editShowing}>
  {#if editShowing}
    <EditGroup {group} bind:open={editShowing} />
  {/if}
</Modal>

<Modal bind:open={deleteShowing}>
    {#if deleteShowing}
      <DeleteGroup {group} bind:open={deleteShowing} />
    {/if}
  </Modal>