<script>
  import { auth } from '../data/auth'
  import NavbarLink from './NavbarLink'
  import { notifications } from './notifications'
  let showMenu = false

  const logout = async () => {
    const username = await auth.logout()
    notifications.add({ text: `Logged out user '${username}'`, type: 'success' })
  }
</script>

<style>
  .logo {
    margin-right: 0.8rem;
  }

  .navbar {
    background: transparent;
    margin: 0;
  }
</style>

<nav class="navbar is-black" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img class="logo" src="kumu-logo.png" height="28" alt="levitation logo" />
      <span class="title is-4">Kumu</span>
    </a>

    {#if $auth.username}
      <div
        role="button"
        class="navbar-burger burger"
        class:is-active={showMenu}
        aria-label="menu"
        aria-expanded="false"
        data-target="navmenu"
        on:click={() => showMenu = !showMenu}
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </div>
    {/if}
    </div>
  
  
    <div
      id="navmenu"
      class="navbar-menu"
      on:click={() => showMenu = !showMenu}
      class:is-active={showMenu}
    >
      <div class="navbar-start">
        {#if $auth.username}
        <NavbarLink url="/" text="Dashboard" />
        <NavbarLink url="groups" text="Groups" />
        <NavbarLink url="students" text="Students" />
        <NavbarLink url="semesters" text="Semesters" />
        {/if}
      </div>
  
      <div class="navbar-end">
        {#if $auth.username}
        
          <NavbarLink url="me" icon="fa-user" text={$auth.username}/>
         
          <div class="buttons">
            <button class="button is-text" on:click={logout}>
                  <strong>Log out</strong>
              </button>
          </div>

        {/if}
      </div>
    </div>
  </nav>