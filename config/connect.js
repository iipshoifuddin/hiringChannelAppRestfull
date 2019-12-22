const mysql = require ('mysql');


// cek dotENV
/*const buf = Buffer.from('BASIC=basic')
const config = dotenv.parse(buf) // will return an object
console.log(typeof config, config) // object { BASIC : 'basic' }
*/

const connect = mysql.createConnection ({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DB_NAME
});

connect.connect (function (err) {
  if (err) throw err;
});

module.exports = connect;