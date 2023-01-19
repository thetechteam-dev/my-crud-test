import mysql from "mysql";
import process from "dotenv";

const configs =  process.config().parsed

const connectionDetails = {
  host: "68.178.145.28",
  user: "rawhit",
  password: "_p)4jU&ziQPT",
  database: "my-blog",
};


export const getUsers = (req, res) => {
  var conn = mysql.createConnection(connectionDetails);
  conn.connect((err) => {
    if (err) {
      res.status(500).send(`database connection failed with err ${err}`);
    } else {
      conn.query("select * from api_user", (err, result) => {
        res.send(result);
      });
    }
    conn.end();
  });
};

export const createUser = (req, res) => {
  var conn = mysql.createConnection(connectionDetails);
  conn.connect((err) => {
    if (err) {
      res.status(500).send(`database connection failed with err ${err}`);
    } else {
      const { userId, name, age } = req.body;
      if (userId != undefined && name != undefined && age != undefined) {
        var sql = `INSERT INTO api_user (userId, name, age) VALUES ('${userId}', '${name}', '${age}')`;
        conn.query(sql, function (err, result) {
            if (err) {
                res.send(`Insertion failed with error ${err}`)
            } else {
                res.send(`Record inserted successfully affected rows ${result.affectedRows}`)
            }
          });
      } else {
        res
          .send(403)
          .send("Bad request not all fields are present to create user");
      }
    }
    conn.end();
  });
};

export const getUserById = (req, res) => {
  const id = req.params.id;
  var conn = mysql.createConnection(connectionDetails);
  conn.connect((err) => {
    if (err) {
      res.status(500).send(`database connection failed with err ${err}`);
    } else {
      conn.query("select * from api_user", (err, result) => {
        if (err) {
            res.status(500).send(`select operation failed with error ${err}`);
        } else {
            const user = result.find((user) => user.userId == id)
            if (user) {
                res.send(user);
            } else {
                res.send(`no records found for userId ${id}`);
            }
        }
      });
    }
    conn.end();
  });
};

export const deleteUserById = (req, res) => {
    const id = req.params.id;
    var conn = mysql.createConnection(connectionDetails);
    conn.connect((err) => {
      if (err) {
        res.status(500).send(`database connection failed with err ${err}`);
      } else {
        var sql = `DELETE FROM api_user WHERE userId = '${id}'`;
        conn.query(sql, function (err, result) {
            if (err) {
                res.send(`Deletion failed with error ${err}`)
            } else {
                res.send(`Record deleted successfully affected rows ${result.affectedRows}`)
            }
          });
      }
      conn.end();
    });
};

export const updateUserById = (req, res) => {
    var conn = mysql.createConnection(connectionDetails);
    conn.connect((err) => {
      if (err) {
        res.status(500).send(`database connection failed with err ${err}`);
      } else {
        const { userId, name, age } = req.body;
        if (userId != undefined && name != undefined && age != undefined) {
          var sql = `UPDATE api_user SET userId = '${userId}', name = '${name}', age = '${age}' WHERE userId='${userId}'`;
          conn.query(sql, function (err, result) {
              if (err) {
                  res.send(`Update operation failed with error ${err}`)
              } else {
                  res.send(`Record updated successfully affected rows ${result.affectedRows}`)
              }
            });
        } else {
          res
            .send(403)
            .send("Bad request not all fields are present to update user");
        }
      }
      conn.end();
    });
};
