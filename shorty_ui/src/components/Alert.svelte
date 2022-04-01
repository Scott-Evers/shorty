<script lang="ts">
  import {createEventDispatcher, SvelteComponent} from 'svelte'
  import {AlertModesEnum, AlertSeverityLevelsEnum} from '../types/types'
  
  const dispatch = createEventDispatcher()
  export let timeout: number = 1500
  export let mode: AlertModesEnum = AlertModesEnum.Final
  export let severity: AlertSeverityLevelsEnum = AlertSeverityLevelsEnum.Info


  console.log(mode)
  $: if (mode == AlertModesEnum.Final) {
    setTimeout(() => {
      console.log('closing alert')
      dispatch('close', null)
    },timeout)
  }

</script>

<div class="alert_overlay">
  <span class="alert_standard {severity == AlertSeverityLevelsEnum.Warn ? 
      'alert_warning' : ''} {severity == AlertSeverityLevelsEnum.Error ? 
      'alert_error' : ''}"><slot /></span>
</div>

<style>
  .alert_overlay {
    z-index: 100;
    background-color: rgba(0,0,0,.2);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .alert_standard {
    border: 1px solid;
    background-color: #eee;
    padding: 1em 2em;
    border-radius: 1em;
    max-width: 90%;
    position: relative;
    top: 50%;
  }
  .alert_warning {
    background-color: #ffd;
  }
  .alert_error {
    background-color: #fdd;
  }
</style>