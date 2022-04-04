<script lang="ts">
  import User from '../components/User.svelte'
  import Urls from '../components/Urls.svelte'
  import Url from '../components/Url.svelte'
  import Alert from '../components/Alert.svelte'

  import {id_token, session_id} from '../stores/store.js'

  import type { AlertType, LoggedInUserType, UrlType } from '../types/types';
  import { AlertModesEnum, AlertSeverityLevelsEnum } from '../types/types'

  

  let alert: AlertType
  let url: UrlType
  enum page_modes {
    View,
    Edit,
    Create,
  }
  let page_mode: page_modes = page_modes.View
  let token_body = JSON.parse(atob($id_token.split('.')[1]))
  let user: LoggedInUserType = {
    id_token: $id_token,
    id: token_body.sub,
    email: token_body.email,
    full_name: `${token_body.given_name} ${token_body.family_name}`,
    initials: `${token_body.given_name.substring(0,1).toUpperCase()}${token_body.family_name.substring(0,1).toUpperCase()}`,
  }

  // event handlers to modify page layout
  const handle_edit = (e: CustomEvent<UrlType>): any => {
    url = e.detail
    page_mode = page_modes.Edit
    console.log(`Editing url: ${e.detail.id}`)
  }
  const handle_create = (): any => {
    url = { id: '', host: '', token: '', target: '', permissions: []}
    page_mode = page_modes.Create
    console.log(`Creating new url`)
  }
  const handle_delete = (id: string): any => {
    console.log(`Deleting url: ${id}`)
  }
  const handle_alert = (e: CustomEvent<AlertType>): any => {
    console.log(e)
    alert = e.detail
    console.log(`alert: ${JSON.stringify(alert)}`)
  }
  const handle_close = (e: CustomEvent<any>): any => {
    console.log('closing alert')
    alert = null
  }
  
  
</script>

<main>
  <header>
    <div class="title">Shorty</div>
    <User user={user} />
  </header>
  {#if page_mode == page_modes.View}
  <button on:click={handle_create}>Add URL</button>
  <Urls id_token={user.id_token} on:edit={handle_edit} on:alert={handle_alert}></Urls>
  {:else}
  <Url url={url} id_token={user.id_token} on:done={() => page_mode = page_modes.View } on:alert={handle_alert} />
  {/if}
  {#if alert}
  <Alert on:close={handle_close} bind:severity={alert.severity} bind:mode={alert.mode}>{alert.message}</Alert>
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