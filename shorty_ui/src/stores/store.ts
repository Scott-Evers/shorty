import {writable} from 'svelte/store'
import {v4 as uuid} from 'uuid'

// ID token
const id_token_stored = localStorage.getItem('id_token')
export const id_token = writable(id_token_stored ? id_token_stored : '')
id_token.subscribe((value) => localStorage.setItem('id_token',value))

// session ID
const session_id_stored = localStorage.getItem('session_id')
export const session_id = writable(session_id_stored || uuid())
session_id.subscribe((value) => localStorage.setItem('session_id',value))

// URLs
export const urls = writable([])
