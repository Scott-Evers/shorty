import db from './db.json' assert {type: "json"}

export const find = (req, res) => {
  console.log(req.hostname,req.params.token)
  let found = db.find((item) => item.host == req.hostname && item.token == req.params.token)
  console.log(found)
  if (found) {
    res.redirect(302,found.target)
  }
  else {
    res.status(404).send('URL not found.')
  }
}