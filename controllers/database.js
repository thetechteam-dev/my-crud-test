import mysql from 'mysql';

var conn = mysql.createConnection( {
    host : "localhost",
    user : "root",
    password : "",
    database : "nikhil_dev"
})

conn.connect(function(err) {
    if (err) throw err;
    conn.query("select * from user", (err, result) => {
        console.log(result);
    })

  });