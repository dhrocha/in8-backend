const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')
var cors = require('cors')

let db = new sqlite3.Database('./db.db')

app.use(bodyParser.json())
app.use(cors())

app.get('/users', cors(), (req, res) => {
  let sql = 'SELECT * FROM users'
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err
    }
    res.send({ rows })
  })
})

app.post('/createUser', (req, res) => {
  console.log(req.body)
  const { name, email, phone, birthday } = req.body
  db.run(
    'INSERT INTO users (name, email, phone, birthday) values (?, ?, ?,?)',
    [name, email, phone, birthday],
    (err) => {
      if (err) {
        throw err
      }
      res.send({
        success: true,
        inserted: req.body,
      })
    }
  )
})

app.listen(3001, () => {
  console.log('Server listening')
})
