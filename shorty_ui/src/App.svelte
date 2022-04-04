<script lang="ts">
	import Admin from './pages/Admin.svelte'

	import { id_token, session_id } from './stores/store.js'

	import { token_isvalid, handle_post_auth } from './lib/auth.js'
	//import './global.css'
	


	const idp_context = {
			idp_host: 'involtasbx.auth.us-east-1.amazoncognito.com',
			idp_client_id: '2valjee85h3pnqttbc3j39ogd',
			pool_id: 'us-east-1_QoMwqVDaw',
		}


	// page logic
	handle_post_auth(window.location.href,$session_id)

	let authenticated = token_isvalid($id_token)
	if (!authenticated) {

		console.warn('ID token invalid')
		window.location.href = 
			 	`https://${idp_context.idp_host}/login?response_type=token&client_id=${idp_context.idp_client_id}&state=${$session_id}&redirect_uri=${window.location.href}`

	}
	
</script>

{#if authenticated}
<Admin />
{/if}
