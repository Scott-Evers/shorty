import {writable} from 'svelte/store'
import {v4 as uuid} from 'uuid'

// store session id in local storage
const session_id_stored = localStorage.getItem('session_id')
export const session_id = writable(session_id_stored || uuid())
session_id.subscribe((value) => localStorage.setItem('session_id',value))

export default session_id