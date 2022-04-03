import redis from './models/redis.dev'
import { UrlType, Principal_Types, Operation_Types} from './types/types.spec'
import {Permission} from './types/types.spec'


let me: Permission = {
  type: Principal_Types.User,
  id: '12345',
  operation: Operation_Types.Edit,
}
redis.create_url({
  id: '',
  host: 'local',
  token: 'abcd',
  target: 'google',
  permissions: [me]
}) 

redis.get_owned_urls('12345',['234','345'])
redis.delete_url({id: '3b5748a0-2af9-4ee0-bf08-3fbd7112152c', host: '', token: '', target: '', permissions: [] })