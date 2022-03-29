import db from './db.json' assert {type: "json"}

export const find = (req, res) => {
  if (db[req.hostname] && db[req.hostname][req.params.token]) {
    res.redirect(302,db[req.hostname][req.params.token])
  }
  else {
    res.status(404).send('URL not found.')
  }
}