<script lang="ts">
  import User from '../components/User.svelte'
  import Urls from '../components/Urls.svelte'

  import type { LoggedInUser } from '../types/types';

  enum page_modes {
    View,
    Edit,
    Create,
  }
  let page_mode: page_modes = page_modes.View
  let id_token = localStorage.getItem('id_token')
  let token_body = JSON.parse(atob(id_token.split('.')[1]))
  let user: LoggedInUser = {
    id_token: id_token,
    id: token_body.sub,
    email: token_body.email,
    full_name: `${token_body.given_name} ${token_body.family_name}`,
    initials: `${token_body.given_name.substring(0,1).toUpperCase()}${token_body.family_name.substring(0,1).toUpperCase()}`,
  }

  const edit_item = (id: string): void => {
    page_mode = page_modes.Edit
    console.log(`Editing url: ${id}`)
  }
  const create_item = (): void => {
    page_mode = page_modes.Create
    console.log(`Creating new url`)
  }
  const delete_item = (id: string): void => {
    page_mode = page_modes.View
    console.log(`Deleting url: ${id}`)
  }
  console.log(token_body)
</script>

<main>
  <header>
    <div class="title">Shorty</div>
    <User user={user} />
  </header>
  {#if page_mode == page_modes.View}
  <Urls id_token={user.id_token} on:edit={edit_item}></Urls>
  {:else if page_mode == page_modes.Edit}
  <div>editing</div>
  {:else}
  <div>creating</div>
  {/if}
</main>

<style>

  .title {
    margin-left: 3rem;
    font-size: 2em;
  }
  header {
    display: flex;
    background-color: #eee;
    justify-content: space-between;
    padding: 10px;
    flex-flow: row;
    align-items: center;
  }
</style>