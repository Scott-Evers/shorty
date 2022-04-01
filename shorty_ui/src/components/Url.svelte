<script lang="ts">
  import {UrlType, 
                AlertType, 
                AlertModesEnum, 
                AlertSeverityLevelsEnum} from '../types/types'
  import {createEventDispatcher} from 'svelte'
  import axios from 'axios'

  const dispatch = createEventDispatcher()
  const API_BASE = process.env.API_BASE

  export let id_token: string
  export let url: UrlType = {
    id: '',
    host: '',
    token: '',
    target: '',
    permissions: []
  }
  const handle_save = () : any => {
    if (url.id == '') {
      //create logic
      console.log('Creating ',url)
      dispatch('alert', {
        message: 'Creating new short URL',
        mode: AlertModesEnum.Pending,
        severity: AlertSeverityLevelsEnum.Info,
      })
      axios.post(`${API_BASE}/url`, url, {
        headers: {
          'Bearer': id_token
        }
      }).then(() => {
          dispatch('alert', {
            message: 'Success',
            mode: AlertModesEnum.Final,
            severity: AlertSeverityLevelsEnum.Info,
          })
          console.log('success')
          dispatch('done',null)
      }).catch((err) => {
        dispatch('alert', {
          message: `Failed to create new short URL: ${JSON.stringify(err)}`,
          mode: AlertModesEnum.Final,
          severity: AlertSeverityLevelsEnum.Error,
        })
        console.log('fail')
        dispatch('done',null)
      })
    }
    else {
      //update logic
      dispatch('alert', {
        message: `Updating short URL for ${url.host}/${url.token}`,
        mode: AlertModesEnum.Pending,
        severity: AlertSeverityLevelsEnum.Info,
      })
      console.log(`Patching ${API_BASE}/url/${url.id}`,url)
      axios.patch(`${API_BASE}/url/${url.id}`, url, {
        headers: {
          'Bearer': id_token
        }
      }).then(() => {
        dispatch('alert', {
          message: 'Success',
          mode: AlertModesEnum.Final,
          severity: AlertSeverityLevelsEnum.Info,
        })
        console.log('success')
        dispatch('done',null)
      }).catch((err) => {
        dispatch('alert', {
            message: `Failed to update short URL: ${err.message}`,
            mode: AlertModesEnum.Final,
            severity: AlertSeverityLevelsEnum.Error,
          })
          console.log('fail')
          dispatch('done',null)
      })
    }
  }
</script>

<div class="url_overlay">
  <div class="url_box">
    {#if url.id == ''}
    <div><input placeholder="host" bind:value={url.host} /></div>
    {/if}
    <div><input placeholder="token" bind:value={url.token} /></div>
    <div><input placeholder="target" bind:value={url.target} /></div>
    <div>
      <button on:click={handle_save}>Save</button>
      <button on:click={() => dispatch('done',null)}>Cancel</button>
    </div>
  </div>
</div>


<style>
  .url_overlay {
    z-index: 100;
    background-color: rgba(0,0,0,.2);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .url_box {
    display: flex;
    flex-direction: column;
    border: 1px solid;
    background-color: #eee;
    padding: 1em 2em;
    border-radius: 1em;
    max-width: 90%;
    position: relative;
    top: 50%;
  }
</style>