<script lang="ts">
	import router from 'page'
	import Admin from './routes/Admin.svelte'
	import PostLogin from './routes/PostLogin.svelte'
	//import './global.css'
	
	let session_id 	= localStorage.getItem('session_id')
	let id_token 		= localStorage.getItem('id_token')

	const idp_context = {
			idp_host: 'involtasbx.auth.us-east-1.amazoncognito.com',
			idp_client_id: '2valjee85h3pnqttbc3j39ogd',
			pool_id: 'us-east-1_QoMwqVDaw',
		}


	const token_isvalid = (id_token: string): boolean => {
		let token_body = JSON.parse(atob(id_token.split('.')[1]))
		console.log(token_body.exp > new Date().getTime() / 1000)
		return true
	}

	let page
	if (token_isvalid(id_token)) {
		// user is authenticated with a valid id_token


		router('/admin', () => page = Admin)
		router('/idp/response', () => page = PostLogin)
		
		router.start()
	} else {
		console.warn('ID token invalid')
		window.location.href = 
			 	`https://${idp_context.idp_host}/login?response_type=token&client_id=${idp_context.idp_client_id}&state=${session_id}&redirect_uri=http://localhost:8080/idp/response`

	}
	
</script>
<svelte:component this={page} />
