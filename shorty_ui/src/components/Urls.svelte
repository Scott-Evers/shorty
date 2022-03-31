<script lang="ts">
  import axios from 'axios'
  import { createEventDispatcher } from 'svelte'
  
  const dispatch = createEventDispatcher()

  export let id_token: string
  const API_BASE = process.env.API_BASE
  const PROTOCOL = process.env.PROTOCOL

  let url_p = axios.get(`${API_BASE}/url`, {
    headers: {
      'Bearer': id_token
    }
  })

  const short_url = (host: string, token: string): string => {
    return `${PROTOCOL}://${host}/${token}`
  }
</script>
{id_token}

{#await url_p}
  <div class="waiting">waiting</div>
{:then urls}
<div class="urls">
    {#each urls.data as url}
      <div class="url">
        <button class="material-icons md-24 md-light edit-button"
              on:click={() => dispatch('edit',url.id)}>edit</button>
        <div><a href="{short_url(url.host,url.token)}" target="_new">{short_url(url.host,url.token)}</a></div>
        <div><a href="{url.target}" target="_new">{url.target}</a></div>
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