import {writable} from 'svelte/store'
import {v4 as uuid} from 'uuid'

// store id_token JWT in local storage
const id_token_stored = localStorage.getItem('id_token')
export const id_token = writable(id_token_stored)
id_token.subscribe((value) => localStorage.setItem('id_token',value))

export default id_token