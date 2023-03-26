var mysql = require("mysql2")
const express = require("express");
const path = require("path");
const app = express();
const port =5000;
const hbs = require("ejs")
const alert =  require("alert");
// const popup = require('popups');
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
    res.render("userLogin.ejs");
})
app.get("/register",(req,res)=>{
    res.render("register.ejs");
})
app.get("/userHome",(req,res)=>{
    res.render("userHome.ejs");
})

app.post("/signup",(req,res)=>{

    var name = req.body.Name;
    var password = req.body.password;
    var aadharNumber = req.body.aadharNumber;
    var mobileNumber= req.body.mobileNumber;
    var ageNumber= req.body.ageNumber;
    var gender = req.body.gender;
    var email = req.body.email;
    con.connect(function(err) {
     if (err) throw err;

   let check =true;
    //  while(check){
     let user_id= Math.floor(Math.random() * 100000);
     let person_id = "user"+user_id;
     con.query("SELECT count(*) FROM person where person_id=(?)",[person_id] ,function (err, result, fields) {
                   console.log(result[0]);
                   console.log("djnckjd");
         if (err) throw err;
       else if(result[0]==0){
            check =false;
            console.log(check);

        }});
    // }
    
         con.query('INSERT INTO person (person_id, person_name, age, gender,aadhar_no,mobile_no,email,pass) VALUES (?, ?, ?, ?, ?,?,?,?)', [person_id,name,ageNumber, gender,aadharNumber ,mobileNumber,email,password],(error, 
     results) => {
         if (error)  throw error;
         else
        res.render("userlogin");

         });
   });

 });


app.listen(port,()=>{
    console.log(`successfully port connected`);
})