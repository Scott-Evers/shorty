<script lang="ts">
  import axios from 'axios'
  import { createEventDispatcher } from 'svelte'
  import { AlertModesEnum, AlertSeverityLevelsEnum } from '../types/types'
  
  const dispatch = createEventDispatcher()

  export let id_token: string
  const API_BASE = process.env.API_BASE
  const PROTOCOL = process.env.PROTOCOL

  const get_urls = (): Promise<any> => {
    console.log('fetching urls')
    return axios.get(`${API_BASE}/url`, {
      headers: {
        'Bearer': id_token
      }
    })
  }
  let url_p
  $: url_p = get_urls()

  const short_url = (host: string, token: string): string => {
    return `${PROTOCOL}://${host}/${token}`
  }

  const edit_item = (e) => {
    console.log(`editing item: ${e}`)
    dispatch('edit',e)
  }  
  const delete_item = (e) => {
    dispatch('alert',{
      message: 'deleting...',
      mode: AlertModesEnum.Pending,
    })
    axios.delete(`${API_BASE}/url/${e}`).then(() => {
      dispatch('alert', {
        message: 'Success',
        mode: AlertModesEnum.Final,
        severity: AlertSeverityLevelsEnum.Info 
      })
      url_p = get_urls()
    })
    console.log(`delete_item called with ${e}`)
    //axios.delete()
  }
</script>

{#await url_p}
  <div class="waiting">waiting</div>
{:then urls}
<div class="urls">
    {#each urls.data as url}
      <div class="url">
        <button class="material-icons md-24 md-light"
              on:click={() => edit_item(url)}>edit</button>
        <div><a href="{short_url(url.host,url.token)}" target="_new">{short_url(url.host,url.token)}</a></div>
        <div><a href="{url.target}" target="_new">{url.target}</a></div>
        <button class="material-icons md-24 md-light"
              on:click={() => delete_item(url.id)}>delete</button>
      </div>
    {/each}
  </div>
{:catch err}
  {err}
{/await}


<style>
  .urls {
    display: flex;
    flex-flow: column nowrap;
    width: 80%;
    text-align: center;
  }
  .url {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    align-content: center;
  }
  .url div {
    padding: 1em 2em;
  }
  .url button {
    border: none;
    background-color: rgba(0,0,0,0);
    padding: 0;
    height: 3em;
    width: 3em  
  }
  .material-icons.md-light { color: rgba(200, 200, 200, 1); }


</style>