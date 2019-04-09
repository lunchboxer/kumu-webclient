<script>
  import { onMount } from 'svelte'
  import { fly, slide } from 'svelte/transition'
  import Modal from '../Modal.svelte'
  import DeleteStudent from './DeleteStudent.svelte'
  import EditStudent from './EditStudent.svelte'
  import EditStudentGroups from './EditStudentGroups.svelte'
  import DL from '../DL.svelte'

  export let student = {}
  export let semesters = {}
  let expanded = false
  let deleteShowing = false
  let editShowing = false
  let groupsShowing = false
  let number = Math.floor(Math.random() * 100) // 0-99
  let gender = student.gender === 'M' ? 'men' : 'women'

  const picture = `https://randomuser.me/api/portraits/${gender}/${number}.jpg`

  $: birthdate = !student.birthdate ? 'none' : student.birthdate.slice(0, 10)
  $: groups = !student.groups ? 'none' : student.groups.map(g => {
    if (!g.name) return
    return `${g.name} (${g.semester.name})`
  }).join(', ')

  const showEdit = () => editShowing = true
  const showDelete = () => deleteShowing = true
  const showGroups = () => groupsShowing = true

  const getAge = (dateString) => {
    const today = new Date()
    const birthDate = new Date(dateString)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }
  $: currentOrNextClass = getCurrentOrNextClass(student.groups)

  const getCurrentOrNextClass = (groups) => {
    if (!groups) return
    if (semesters.currentSemester) {
      let currentGroup = groups.find(group => {
        return group.semester.id === semesters.currentSemester.id
      })
      if (currentGroup) return `Current ${currentGroup.name} class`
    }
    if (semesters.nextSemester) {
      let nextGroup = groups.find(group => {
        return group.semester.id === semesters.nextSemester.id
      })
      if (nextGroup) return `Next ${nextGroup.name} class`
    }
    return "Not enrolled"
  }
</script>

<style>
  img.portrait {
    border: 4px solid #aaa;
  }

  img.F {
    border: 4px solid lightcoral;
  }

  img.M {
    border: 4px solid #5599ff;
  }

  div.card {
    padding: 0;
    margin: 0.3rem;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  div.card-content {
    padding: 1rem;
  }

  @media only screen and (max-width: 510px) {
    div.card {
      width: 100%;
    }

    div.card-content,
    .is-4,
    .is-6 {
      font-size: 130%;
    }

    figure img.portrait {
      width: 96px;
    }
  }

  @media only screen and (min-width : 510px) and (max-width : 768px) {
    div.card {
      width: 48%;
    }
  }

  @media only screen and (min-width: 768px) {
    div.card {
      max-width: 320px;
    }

    figure img.portrait {
      width: 64px;
    }
  }

  li {
    list-style: none;
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

  .groups-list {
    list-style: none;
    margin: 0;
  }

  .media {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .expand-button {
    margin-left: 1rem;
    color: #14a098;
  }

  span.chinese {
    font-weight: normal;
  }
</style>

<div class="card">
  <div class="card-content">
    <div class="media" on:click={()=> expanded = !expanded }>
      <div class="media-left">
        <figure class="image">
          <img src={picture} alt="portrait" class="is-rounded portrait {student.gender}">
        </figure>
      </div>
      <div class="media-content">
        <p><strong>{student.englishName}</strong> <span class="chinese">{student.chineseName}</span></p>
        <p>{currentOrNextClass}</p>
        <p>{getAge(birthdate)} yrs old</p>
      </div>
      <i class="expand-button fas fa-angle-{expanded ? 'up' : 'down'}"></i>
    </div>
    {#if expanded}
    <div transition:slide|local="{{duration: 200}}">
      <DL>
        <dt>Groups:</dt>
        <dd>
          <ul class="groups-list">
              {#each student.groups as group}
    <li>{group.name} - {group.semester.name}</li>
            {:else}
            none
            {/each}
          </ul>
        </dd>

        <dt>Pinyin:</dt><dd>{student.pinyinName}</dd>
        <dt>Birthdate:</dt><dd>{birthdate}</dd>
          <dt>Total points:</dt><dd>{student.pointsTally}</dd>
      </DL>
      
    </div>
    {/if}
  </div>
  <footer class="card-footer">
    <button class="card-footer-item" on:click={showGroups}>Groups</button>
    <button class="card-footer-item" on:click={showEdit}>Edit</button>
    <button class="card-footer-item" on:click={showDelete}>Delete</button>
  </footer>
</div>

<Modal bind:open={deleteShowing}>
  {#if deleteShowing}
    <DeleteStudent {student} bind:open={deleteShowing} />
  {/if}
</Modal>

<Modal bind:open={editShowing}>
  {#if editShowing}
    <EditStudent {student} bind:open={editShowing} />
  {/if}
</Modal>

<Modal bind:open={groupsShowing}>
  {#if groupsShowing}
    <EditStudentGroups {student} bind:open={groupsShowing} />
  {/if}
</Modal>