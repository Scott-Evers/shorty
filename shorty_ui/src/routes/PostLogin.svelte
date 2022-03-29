<script lang="ts">
  import {getContext, setContext} from 'svelte'

	let session_id = document.cookie
		.split('; ')
		.find(row => row.startsWith('session_id='))
		.split('=')[1]
		
	//read querystring and store context if returning from idp
	const params = (new URL(window.location.href.replace('#','?'))).searchParams;
	// params.forEach((val: String, key: String) => {
	// 		console.log(`key: ${key}\r\nvalue: ${val}`)
	// 	})

	let state = params.get('state')
	console.log(`state: ${state}\r\nsession_id: ${session_id}`)
	if (state == session_id) {
		document.cookie = `id_token=${params.get('id_token')}; path=/`
		console.log(document.cookie)
		window.location.href = '/admin'
	}
</script>

<main>
	{#if (state != session_id)}
	Invalid state provided by Identity Provider
	{/if}
</main>