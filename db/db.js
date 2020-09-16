const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const db = new sqlite3.Database('./db.db', (err) => {
  if (err) {
    console.log('Erro ao conectar: ' + err)
  }
})

module.exports = db
