import express from 'express'
import model from '../models/db.js'
import {UrlType, 
        Permission, 
        Principal_Types, 
        Operation_Types} from '../types/types.spec.js'
import type { PrincipalType } from '../types/types.spec.js'

const get_user = async (req: express.Request, res: express.Response) => {
  let user_id: string = req.headers['user'] as string
  try {
    let user: Array<any> = await model.get_principal(user_id)
    let r: PrincipalType = {
      id: user[0].immutable,
      name: user[0].name,
      type: user[0].type,
      memberships: []
    }
    res.send(JSON.stringify(r))
  }
  catch (err) {
    console.error(err)
    res.status(500).send('An error occurred')
  }
}

const create_user = (req: express.Request, res: express.Response) => {
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

const put_user = (req: express.Request, res: express.Response) => {
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


export default {
  get_user,
  create_user,
  put_user,
}