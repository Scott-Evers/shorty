import express from 'express'
import model from '../models/dev'
import {Url, 
        Permission, 
        Principal_Types, 
        Operation_Types} from '../types/types.spec'

const get_owned_urls = (req: express.Request, res: express.Response) => {
  let user: string = req.headers['user'] as string
  let groups: Array<string> = req.headers['groups'] as Array<string>
  try {
    let urls: Array<Url> = model.get_owned_urls(user, groups)
    res.send(JSON.stringify(urls))
  }
  catch (err) {
    console.error(err)
    res.status(500).send('An error occurred')
  }
}

const create_url = (req: express.Request, res: express.Response) => {
  //TODO: validate the user can create in this domain
  //TODO: validate the entry does not already exist
  try{
    let user: string = req.headers['user'] as string
    let groups: Array<string> = req.headers['groups'] as Array<string>
    let url: Url = req.body

    let perms: Permission = {
      type: Principal_Types.User,
      id: user,
      operation: Operation_Types.Edit,
    }
    url.permissions = [perms]
    let id = model.create_url(url)
    res.send(id)
  } catch (err) {
    console.error(err)
    res.status(500).send('An error occurred')
  }
}

const delete_url = (req: express.Request, res: express.Response) => {
  let user: string = req.headers['user'] as string
  let groups: Array<string> = req.headers['groups'] as Array<string>
  try{
    let id = req.params.id
    //TODO: validate the user can delete this record
    model.delete_url(id)
    res.send('Record successfully deleted')
  } catch (err) {
    console.error(err)
    res.status(500).send('An error occurred')
  }
}

export default {
  get_owned_urls,
  create_url,
  delete_url,
}