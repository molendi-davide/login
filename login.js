var express = require("express");
var dotenv = require("dotenv");
var cors = require("cors");
var mysql = require("mysql");

const app = express();
app.use(cors());
dotenv.config();

var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})

connection.connect();

app.post("/login", (req,res) => {
    var username = req.body.username;
    var password = req.body.password;
    const query = "SELECT * from utenti where username=? AND password=?";
    connection.query(query, [username, password], (err, results) => /**/{
        if (err) throw err;
        if (results.legth === 1){
            res.send("Login eseguito");
        }else{
            res.send("Login fallito (username o password errati)");
        }
    });
    connection.end();
})
app.listen(3000);