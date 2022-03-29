import {Url} from '../types/types.spec'
import fs from 'fs'
import {v4 as uuid} from 'uuid'

let urls : Array<Url> = JSON.parse(fs.readFileSync('./urls.dev.json').toString())


const save_url = (update: boolean, url: Url) => {

}

const get_owned_urls = (user: any, groups: any): Array<Url>  => {
    return urls
}

const create_url = (url : Url): string => {
  url['id'] = uuid()
  urls.push(url)
  fs.writeFileSync('./urls.dev.json',JSON.stringify(urls))
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
  delete_url,
}