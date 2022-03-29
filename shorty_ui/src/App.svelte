<script lang="ts">
	import {getContext,setContext} from 'svelte'
	import {v4 as uuid} from 'uuid'
	import jsonwebtoken from 'jsonwebtoken'
	import jwkToBuffer from 'jwk-to-pem'
	import jmespath from 'jmespath'



	const idp_context = {
			idp_host: 'involtasbx.auth.us-east-1.amazoncognito.com',
			idp_client_id: '2valjee85h3pnqttbc3j39ogd',
			pool_id: 'us-east-1_QoMwqVDaw',
		}


	//get the session ID if it exists from a cookie
	let session_cookie = document.cookie
		.split('; ')
		.find(row => row.startsWith('session_id='))
	let session_id
	if (!session_cookie || session_cookie.length == 0) {
		session_id = uuid()
		document.cookie = `session_id=${session_id}; path=/`
	} else {
		session_id = session_cookie.split('=')[1]
	}
	//get the id token from a cookie if it exists
	let jwt
	let jwt_cookie = document.cookie
		.split('; ')
		.find(row => row.startsWith('id_token='))
	if (jwt_cookie && jwt_cookie.length > 0) {
		jwt = jwt_cookie.split('=')[1]
	}
	
	const valid_session = async (jwt: string): Promise<boolean> => {
		console.log(jwt)
		if (jwt) {
			let certs = await  fetch(`https://cognito-idp.us-east-1.amazonaws.com/${idp_context.pool_id}/.well-known/jwks.json`)
    
			let header = JSON.parse(atob(jwt.split('.')[0]))
			let val_key = jmespath.search(certs,`keys[?kid=='${header.kid}']`)
	
			
			let pem = jwkToBuffer(val_key[0]);
			let jwt_decoded = jsonwebtoken.verify(jwt, 
							pem, 
							{ 
								algorithms: ['RS256'], 
								iss: `https://cognito-idp.us-east-1.amazonaws.com/${idp_context.pool_id}` 
							})
			console.log(jwt_decoded)
			return true
		}
		return false
	}

	// check to see if the request is authenticated or is the login handler
	const path = (new URL(window.location.href.replace('#','?'))).pathname
	if (!(path.startsWith('/idp/response') || valid_session(jwt))) {

			 window.location.href = 
			 	`https://${idp_context.idp_host}/login?response_type=token&client_id=${idp_context.idp_client_id}&state=${session_id}&redirect_uri=http://localhost:8080/idp/response`

	}
	

	// user is authenticated with a valid id_token
	import router from 'page'
	import Admin from './routes/Admin.svelte'
	import PostLogin from './routes/PostLogin.svelte'
	//import './global.css'

	let page

	router('/admin', () => page = Admin)
	router('/idp/response', () => page = PostLogin)
	
	router.start()
	
</script>

<svelte:component this={page} />
