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
  .card {
    min-width: 150px;
    margin: 0.3rem;
    display: flex;
    border-radius: 4px;
    flex-direction: column;
    justify-content: space-between;
  }

  @media only screen and (max-width: 352px) {
    .card {
      width: 100%;
    }
  }

  @media only screen and (min-width: 352px) and (max-width: 510px) {
    .card {
      width: calc(50% - 0.6rem)
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

  .list-heading {
    text-decoration: underline;
  }
</style>

<li class="card" in:fly="{{x: 400}}" out:fly="{{x: -400}}">
  <div class="card-content">
    <h3 class="title is-4">{group.name} class</h3>
    <h4 class="subtitle is-6">{group.semester.name}</h4>
    {#if group.students && group.students.length}
    <p class="list-heading">{group.students.length} students</p>
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