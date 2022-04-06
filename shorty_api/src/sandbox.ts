import data from './models/db'
import { Principal_Types } from './types/types.spec'

// console.log(await data.create_url({ 
//   id: '06ce9e8b-4dd5-4eff-8274-337a070d5944',
//   host: 'localhost',
//   token: 'goog',
//   target: 'https://google.com/',
//   permissions: [{
//     type: 0,
//     id: 'user9e8b-4dd5-4eff-8274-337a070d5944',
//     operation: 1,
//   }]
// }))
// console.log(await data.update_url({ 
//     id: '20cce4a3-73e8-4323-8ac5-c016cf9ee656',
//     host: 'loc',
//     token: 'goog1',
//     target: 'https://google.com/',
//     permissions: [{
//       type: 0,
//       id: 'user9e8b-4dd5-4eff-8274-337a070d5944',
//       operation: 1,
//     }]
//   }))
console.log(await data.get_owned_urls({ id: '06ce9e8b-4dd5-4eff-8274-337a070d5944'},null))
//console.log(await data.create_principal({id: 'asbasdfas',name:'email',type: Principal_Types.User,memberships:[]}))
console.log('get_principal',await data.get_principal('asbasdfas'))