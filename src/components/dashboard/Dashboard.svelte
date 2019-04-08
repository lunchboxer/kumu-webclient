<script>
  import { subRequest, wsQueryRequest } from '../../data/ws-client'
  import { request } from '../../data/fetch-client'
  import { ACTIVE_GROUPS } from '../../data/queries'
  import gql from 'nanographql'

  let sessions = []

  const query = gql`
  subscription TheClassSessions {
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
query TheActiveGroups {
  activeGroups {
    id
    name
    semester {
      name
    }
  }
}
`

  // subRequest(query, null, function (data) {
  //   console.log(data)
  // })

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