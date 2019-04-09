<script>
  import { onMount } from 'svelte'
  import { subRequest, wsQueryRequest } from '../../data/ws-client'
  import { request } from '../../data/fetch-client'
  import { ACTIVE_GROUPS } from '../../data/queries'
  import { GET_SESSIONS } from '../sessions/queries'

  let sessions = []

  onMount(async () => {
    const response = await request(GET_SESSIONS)
    sessions = response.classSessions
  })

  const query = `
  subscription {
  classSessions {
     mutation
      updatedFields
    previousValues{
      id
      stage
      startsAt
      endsAt
    }
      node {
        id
        stage
        startsAt
        endsAt
        number
        group {
          id
          name
        }
      }
  }
}`

  const ACTIVE_GROUPS_String = `
    query {
      activeGroups {
        id
        name
        semester {
          name
        }
      }
    }
  `

  subRequest(query, null, function (data) {
    const { mutation, node, previousValues } = data.classSessions
    if (mutation === "CREATED") {
      sessions = [...sessions, node]
    } else if (mutation === "UPDATED") {
      sessions = sessions.map(s => {
        if (s.id === node.id) return s
        return node
      })
    } else if (mutation === "DELETED") {
      sessions = sessions.filter(s => s.id !== previousValues.id)
    }
  })

  $: console.log(sessions)
  const wsquery = async () => {
    const t0 = performance.now()
    const response = await wsQueryRequest(ACTIVE_GROUPS_String)
    console.log("static query", response)
    const t1 = performance.now()
    console.log("Call to wsquery took " + (t1 - t0) + " milliseconds.")
  }
  const fetchquery = async () => {
    const t0 = performance.now()
    const response = await request(ACTIVE_GROUPS_String)
    console.log("fetchquery data", response)
    const t1 = performance.now()
    console.log("Call to fetch took " + (t1 - t0) + " milliseconds.")
  }

</script>
<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<h1 class="title">Dashboard</h1>

<button class="button" on:click={wsquery}>query using websockets</button>

<button class="button" on:click={fetchquery}>query using fetch</button>