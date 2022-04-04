import {id_token} from '../stores/store.js'


export const handle_post_auth = (url: string, session_id: string) : void => {
  //read querystring and store context if returning from idp
  const Url = new URL(url.replace('#','?'))
  const params = Url.searchParams;
  
  let state = params.get('state')
  if (state && state == session_id) {
    id_token.set(params.get('id_token'))
    window.location.href = Url.pathname
  }
}

export const token_isvalid = (id_token: string): boolean => {
  if (id_token) {
    let token_body = JSON.parse(atob(id_token.split('.')[1]))
    return token_body.exp > new Date().getTime() / 1000
  } else {
    return false
  }
}
