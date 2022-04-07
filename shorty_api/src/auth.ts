import express from 'express'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import jwkToPem  from 'jwk-to-pem'
import model from './models/db.js'
import { PrincipalType, Principal_Types } from './types/types.spec.js'




export const validate_token = async (req : express.Request, res : express.Response, next : Function) => {

  let valid_auth = false
  console.log('validating credentials')
  if (!req.header('Bearer')) {
    res.status(401).send('Bearer token required')
  } else {
    const id_token = req.header('Bearer')
    // validate jwt
    if (!id_token || id_token.split('.').length != 3)
      res.status(401).send('ID token not properly structured')

    let certs = await axios.get(`https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`)

    let header = JSON.parse(Buffer.from(id_token.split('.')[0],'base64').toString('ascii'))
    let signing_key = certs.data.keys.filter(key => key.kid == header.kid)
    if (signing_key.length != 1)
    res.status(400).send('Invalid signing key')
    
    let pem = jwkToPem(signing_key[0]);
    let validated_token
    try {
      let token = jwt.verify(id_token, pem, { algorithms: ['RS256'], iss: `https://cognito-idp.us-east-1.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}` })
      let known_user: Array<PrincipalType> = await model.get_principal(token.sub)
      if (known_user.length == 0) await model.create_principal({
        id: token.sub,
        type: Principal_Types.User,
        name: token.email,
        memberships: []
      })
      console.log('known_user:', await known_user)

      req.headers['user'] = token.sub; req.headers['groups'] = [] //JSON.stringify(['group1','group2']) //TODO: validate JWT here (https://javascript.plainenglish.io/verifying-json-web-tokens-with-express-jwt-1ae147aa9bd3)
      next()
    } 
    catch (err) {
      console.error(err)
        switch (err.name) {
          case 'TokenExpiredError':
            res.status(401).send('Token expired')
            break
          default:
            res.status(500).send('Unknown error occurred while validating ID token')
            console.error(err)
            break
        }
    }    

  }
}