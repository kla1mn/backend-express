let express = require('express');
let router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
                                           id INTEGER PRIMARY KEY AUTOINCREMENT,
                                           name text)`);

/* GET users listing. */
router.get('/', function(req,
                         res,
                         next) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});

router.post('/', function(req,
                          res,
                          next) {
  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, name = req.body['name']);
  res.send('200 OK');
});

module.exports = router;
