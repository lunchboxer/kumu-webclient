<script>
  import { subRequest } from '../../data/ws-client'
  import { request } from '../../data/fetch-client'
  import { GET_SESSIONS } from '../sessions/queries'
  import { onMount } from 'svelte'

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

  subRequest(query, null, function (data) {
    const { mutation, node, previousValues } = data.classSessions
    if (mutation === 'CREATED') {
      sessions = [...sessions, node]
    } else if (mutation === 'UPDATED') {
      sessions = sessions.map(s => {
        if (s.id === node.id) return s
        return node
      })
    } else if (mutation === 'DELETED') {
      sessions = sessions.filter(s => s.id !== previousValues.id)
    }
  })

  $: console.log(sessions)

</script>
<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<h1 class="title">Dashboard</h1>