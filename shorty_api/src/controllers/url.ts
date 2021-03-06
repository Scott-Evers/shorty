import express from 'express'
import model from '../models/db.js'
import {UrlType, 
        Permission, 
        Principal_Types, 
        Operation_Types} from '../types/types.spec.js'

const get_owned_urls = async (req: express.Request, res: express.Response) => {
  let user: string = req.headers['user'] as string
  let groups: Array<string> = req.headers['groups'] as Array<string>
  try {
    let urls: Array<UrlType> = await model.get_owned_urls(user, groups)
    
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
    let url: UrlType = req.body

    let perms: Permission = {
      type: Principal_Types.User,
      id: user,
      operation: Operation_Types.Edit,
    }
    url.permissions = [perms]
    let id = model.create_url(url)
    console.log(id)
    res.status(200).send(id)
  } catch (err) {
    console.error(err)
    res.status(500).send('An error occurred')
  }
}



const patch_url = (req: express.Request, res: express.Response) => {
  //TODO: validate the user can create in this domain
  //TODO: validate the entry does not already exist
  try{
    let user: string = req.headers['user'] as string
    let groups: Array<string> = req.headers['groups'] as Array<string>
    let url: UrlType = req.body

    let perms: Permission = {
      type: Principal_Types.User,
      id: user,
      operation: Operation_Types.Edit,
    }
    url.permissions = [perms]
    let id = model.patch_url(url)
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
    console.log('DELETE /url called with id:', id)
    model.delete_url({
      id: id,
      host: '',
      token: '',
      target: '',
      permissions: [],
    })
    res.send('Record successfully deleted')
  } catch (err) {
    console.error(err)
    res.status(500).send('An error occurred')
  }
}

export default {
  get_owned_urls,
  create_url,
  patch_url,
  delete_url,
}