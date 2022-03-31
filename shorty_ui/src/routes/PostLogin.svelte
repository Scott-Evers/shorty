<script lang="ts">
  import {id_token} from '../store'

	
	//read querystring and store context if returning from idp
	const params = (new URL(window.location.href.replace('#','?'))).searchParams;
		
	let session_id 	= localStorage.getItem('session_id')
	let state = params.get('state')
	if (state == session_id) {
		id_token.set(params.get('id_token'))
		window.location.href = '/admin'
	}
</script>

<main>
	{#if (state != session_id)}
	Invalid state provided by Identity Provider
	{/if}
</main>