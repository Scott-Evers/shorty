<script lang="ts">
  import axios from 'axios'
  import { createEventDispatcher } from 'svelte'
  import { AlertModesEnum, AlertSeverityLevelsEnum, UrlType } from '../types/types'
  import {urls} from '../stores/store.js'
  
  const dispatch = createEventDispatcher()

  export let id_token: string
  const API_BASE = process.env.API_BASE
  const PROTOCOL = process.env.PROTOCOL

  let search: string = ''
  let filtered_urls: Array<UrlType> = []
  $: {
    if (search) {
      filtered_urls = $urls.filter((url: UrlType) => 
        url.host.toLowerCase().includes(search.toLowerCase()) ||
        url.token.toLowerCase().includes(search.toLowerCase()) ||
        url.target.toLowerCase().includes(search.toLowerCase()))
      console.log(filtered_urls)
    } else {
      filtered_urls = $urls
    }
  }

  axios.get(`${API_BASE}/url`, {
    headers: {
      'Bearer': id_token
    }
  }).then(u => {
      console.log(u)
      urls.set(u.data)
    }).catch(err => dispatch('alert', {
    message: `Unable to fetch urls for user: ${err.message}`,
    mode: AlertModesEnum.Final,
    timeout: 2500,
    severity: AlertSeverityLevelsEnum.Error
  }))
  
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
    })
    console.log(`delete_item called with ${e}`)
    //axios.delete()
  }
</script>

<div class="urls">
    <input type="text" placeholder="Search URLs" bind:value={search}>
    {#each filtered_urls as url}
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