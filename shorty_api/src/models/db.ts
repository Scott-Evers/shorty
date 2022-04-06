import {UrlType, Principal_Types} from '../types/types.spec.js'
import type {PrincipalType} from '../types/types.spec.js'
import {v4 as uuid} from 'uuid'
import mysqlx from '@mysql/xdevapi'


let session = await mysqlx.getSession( {
  host: 'localhost', port: 33060,
  user: 'root', password: 'my-secret-pw' 
});

const connect = () => {
  return session

}


const save_url = async (operation, url: UrlType): Promise<string> => {
  console.log(`getting tables prior to ${operation}`)
  let url_table = await connect().getSchema('shorty').getTable('urls')
  let perms_table = await connect().getSchema('shorty').getTable('permissions')
  //let principals_table = await connect().getSchema('shorty').getTable('principals')

  let r
  switch (operation) {
    case 'delete':
      console.log('Deleting url:',url.id)
      // remove permissions
      r = await perms_table.delete().where(`url == "${url.id}"`).execute()
      console.log(`deleted ${r.getAffectedItemsCount()} records from url table`)
      // remove url
      r = await url_table.delete().where(`immutable == "${url.id}"`).execute()
      console.log(`deleted ${r.getAffectedItemsCount()} records from permissions table`)
      break
    case 'update':
      console.log(`updating url ${url.id}`)
      r = await url_table.update().where(`immutable == "${url.id}"`).set('host',url.host)
                .set('token', url.token).set('target',url.target).execute()
      //TODO: replace permissions
      break
    case 'patch':
      console.log(`patching url ${url.id}`)
      r = await url_table.update().where(`immutable == "${url.id}"`).set('host',url.host)
                .set('token', url.token).set('target',url.target).execute()
      //TODO: unify permissions
      break
    case 'create':
      await url_table.insert(['immutable', 'host', 'token', 'target'])
                        .values([url.id, url.host, url.token, url.target]).execute()
      url.permissions.map(async (perm) => {
        await perms_table.insert(['principal','url'])
                        .values([perm.id,url.id]).execute()
      })
    break
    default:
      console.log(`unknown database operation`)
  }
  return null
}

const get_owned_urls = async (user: string, groups: any): Promise<Array<UrlType>>  => {
  let results = await connect().sql(`SELECT u.immutable as id, u.token, u.target, u.host FROM shorty.permissions p INNER JOIN shorty.urls u ON p.url = u.immutable WHERE p.principal = ?`).bind(user).execute()
  let urls = build_typed_record(results.getColumns(),results.fetchAll())
  console.log('urls:',urls)
  return urls
    //return urls.filter(url => url.permissions.filter(perm => perm.type == Principal_Types.User && perm.id == user).length > 0)
}

const create_url = async (url : UrlType) : Promise<string> => {
  url['id'] = uuid()
  let result = await save_url('create',url)
  return result
}

const patch_url = (url : UrlType) : string => {
  //urls.push(url)
  return url.id
}

const update_url = async (url : UrlType) : Promise<string> => {
  let result = await save_url('update',url)
  return result
}

const delete_url = async (url: UrlType): Promise<string> => {
  let result = await save_url('delete',url)
  return result
}

const get_principal = async (id: string): Promise<any> => {
  let principals_table = await connect().getSchema('shorty').getTable('principals')
  let r = await principals_table.select().where(`immutable == "${id}"`).execute()
  return build_typed_record(r.getColumns(), r.fetchAll())
}

const create_principal = async (pr: PrincipalType): Promise<any> => {
  let principals_table = await connect().getSchema('shorty').getTable('principals')
  let r = await principals_table.insert('immutable', 'name', 'type')
                                .values(pr.id,pr.name,pr.type).execute()
  return { affected_rows: r.getAffectedItemsCount() }
}


const build_typed_record = (cols: Array<any>, recs: Array<Array<any>>): Array<any> => {
  let r = []
  recs.forEach((rec: Array<any>) => {
    let o = {}
    cols.forEach((col: any, i) => {
      o[col.getColumnLabel()] = rec[i]
    })
    console.log(o)
    r.push(o)
  })
  return r
}

export default {
  save_url,
  get_owned_urls,
  create_url,
  patch_url,
  update_url,
  delete_url,
  get_principal,
  create_principal,
}