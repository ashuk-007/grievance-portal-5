var mysql = require("mysql2")
const express = require("express");
const path = require("path");
const app = express();
const port =4000;
const hbs = require("ejs")
const alert =  require("alert");
// const popup = require('popups');
const inputs = require('./user')
const loginUse = require('./login')
var con = mysql.createConnection({
    host : "localhost",
    user : "root",
   password : "MySQL@123",
    database  : "gri"
});
app.use(express.json());
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: false }));    
app.use('/static', express.static(path.join(__dirname, 'static')))
app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/userLogin",(req,res)=>{
    res.render("userLogin.ejs");
})

app.get("/officerlogin",(req,res)=>{
    res.render("userLogin.ejs");
})
app.get("/register",(req,res)=>{
    res.render("register.ejs");
})

app.get("/userHome", (req,res)=>{
    res.render("userHome.ejs")
})

app.post("/signup",(req,res)=>{

    var name = req.body.Name;
    var password = req.body.password;
    var aadharNumber = req.body.aadharNumber;
    var mobileNumber= req.body.mobileNumber;
    var ageNumber= req.body.ageNumber;
    var gender = req.body.gender;
    var email = req.body.email;
    inputs(con, name, password, aadharNumber, mobileNumber, ageNumber, gender, email)
    res.render("userlogin");
 });

 app.post("/userlogin", (req,res)=>{
    var password = req.body.password;
    var email = req.body.email;
    console.log("---------------------");
    var ans = loginUse(email, password);
    console.log(ans);
    if(ans==1){
        res.render("userHome");
    }
    else{
        res.render("userlogin");
    }
 })


app.listen(port,()=>{
    console.log(`successfully port connected`);
})