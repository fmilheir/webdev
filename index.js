const express = require('express');
const mysql = require('mysql');

const sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "website"
})

sql.connect(error => {
    if(error) throw error;
    console.log("The database has sucsefuly started.");
});
const app = express();


app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.get("/", (req, res)=> {
    res.render("index");
})

app.get("/contact\ us", (req, res)=> {
    res.render("contact\ us");
})  

app.get("/info", (req, res)=> {
    res.render('info');
})

app.post("/recived", (req, res)=> {
    let username =req.bod.username;
    let email = req.body.email;
    let password = req.body.password;
    sql.query("INSERT INTO website(user _name, email, password) VALUES(?,?,?)",[username, email, password], (error,results)=>{
        res.render("result", {err : error})
    })  
})  

app.get("/users/:username", (req, res)=> {
    res.send(`<h1>wlecome ${req.params.username}</h1>`);
})
app.listen(5000, ()=>{console.log("server started! ")});
