import {UrlType} from '../types/types.spec.js'
import fs from 'fs'
import {v4 as uuid} from 'uuid'

let urls : Array<UrlType> = JSON.parse(fs.readFileSync('./urls.dev.json').toString())


const save_url = (update: boolean, url: UrlType) => {

}

const get_owned_urls = (user: any, groups: any): Array<UrlType>  => {
    return urls
}

const create_url = (url : UrlType) : string => {
  url['id'] = uuid()
  urls.push(url)
  fs.writeFileSync('./urls.dev.json',JSON.stringify(urls))
  return url.id
}

const patch_url = (url : UrlType) : string => {
  //urls.push(url)
  let new_urls = urls.filter(u => u.id != url.id)
  new_urls.push(url)
  fs.writeFileSync('./urls.dev.json',JSON.stringify(new_urls))
  return url.id
}

const delete_url = (id: string) => {
  urls = urls.filter((url) => id != url.id)
  console.info(urls)
  fs.writeFileSync('./urls.dev.json',JSON.stringify(urls))
}


export default {
  save_url,
  get_owned_urls,
  create_url,
  patch_url,
  delete_url,
}