var mysql = require("mysql2")
const express = require("express");
const path = require("path");
const app = express();
const port =4000;
const hbs = require("ejs")
const alert =  require("alert");
// const popup = require('popups');
const inputs = require('./user')
const logim = require('./login')
const officerlogim = require('./officerlogin')
const complaint = require('./complaint')


// const { logim} = require('./login')

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
   password : "tanish@0601",
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
    res.render("officerLogin.ejs");
})
app.get("/register",(req,res)=>{
    res.render("register.ejs");
})
app.get("/userHome",(req,res)=>{
    res.render("userHome.ejs");
})

app.get("/userHome", (req,res)=>{
    res.render("userHome.ejs")
})

app.get("/postgrievanceRural", (req,res)=>{

let re ;
    con.connect(function(err){
                if(err){
                    console.log("PROBLEM");
                    throw err;
                }
                con.query("SELECT * from department", function(err, result, fields){
                    if(err) throw err;
                    // console.log(result);
                    re=result
                    res.render("postgrievanceRural.ejs",{result});
                })
            })

    //         console.log(re);
    // res.render("postgrievanceRural.ejs",{re});
    

})

app.get("/trackgrievance", (req,res)=>{
    res.render("trackgrievance.ejs")
})

app.get("/index",(req,res)=>{
    res.render("index.ejs");
})


app.post("/register",(req,res)=>{

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
    console.log(email);

     ans=logim(con,email, password,res);

  
 })



 app.post("/officerlogin", (req,res)=>{
    var password = req.body.password;
    var email = req.body.Email;
        console.log(email);
     ans=officerlogim(con,email, password,res);

  
 })


app.listen(port,()=>{

    console.log(`successfully port connected`);
})