import {createClient} from 'redis'

const url = process.env.REDIS_URL
const pwd = process.env.REDIS_PWD
let client = createClient({
  url: url
})
client.on('error', (err) => {
  console.error('Redis Client Error', err)
  throw err
});
client.on('connect', () => console.info(`connected to redis at ${url}`))

await client.connect()
await client.auth({ password: pwd })


export const find = async (req, res) => {
  let key = `${req.hostname}/${req.params.token}`
  let found = await client.get(`url://${key}`)
  if (found) {
    client.incr(`activity://${key}`)
    console.log(`FOUND:${key}`)
    res.redirect(302,found)
  }
  else {
    console.log(`NOTFOUND:${key}`)
    res.status(404).send('URL not found.')
  }
}