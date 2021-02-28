const mysql = require('mysql2');

let pool = mysql.createPool({
    "user"     : process.env.MYSQL_USER,
    "password" : process.env.MYSQL_PW,
    "database" : process.env.MYSQL_DB,
    "host"     : process.env.MYSQL_HOST,
    /* "port"     : process.env.MYSQL_PORT */
})

/* mysql://
b6871daca29dd3
844faa81
@
us-cdbr-east-03.cleardb.com
/heroku_c57ba4511b51594? */

exports.pool = pool;