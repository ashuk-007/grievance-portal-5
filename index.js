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
var offemail;
var useremail;
// const { logim} = require('./login')

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
   password : "India@no.1",
    database  : "gri"
});
app.use(express.json());
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: false }));    
app.use('/static', express.static(path.join(__dirname, 'static')))
app.get("/",(req,res)=>{
    console.log("Welcome to grievence portal");
    res.render("index.ejs");
});

app.get("/userLogin",(req,res)=>{
    console.log("asking for userlogin");

    res.render("userLogin.ejs");
})

app.get("/officerlogin",(req,res)=>{
    console.log("asking for officerlogin");

    res.render("officerLogin.ejs");
})
app.get("/register",(req,res)=>{
    console.log("asking for registration");

    res.render("register.ejs");
})
app.get("/userHome",(req,res)=>{
    console.log("user enter in userHome");
    con.connect(function(err){
        con.query("SELECT * from person where email = (?) ", [useremail], function(err, result, fields){
        if(err){
            console.log("PROBLEM");
            throw err;
        }
        con.query("select * from complaint inner join track on complaint.complaint_id = track.complaint_id where person_id = (?)",[result[0].person_id], function(err, result1, fields){
            if(err) throw err;
            con.query("select * from department", function(err, result2, fields){
                if(err) throw err;
                console.log(result2);
                res.render("userHome.ejs",{result1,result2});
            });
        })
    })
});


    res.render("userHome.ejs");
})


app.get("/postgrievanceRural", (req,res)=>{
    con.connect(function(err){
                if(err){
                    console.log("PROBLEM");
                    throw err;
                }
                con.query("SELECT * from department", function(err, result, fields){
                    if(err) throw err;
                    console.log("asking for post complain , deppt list send succesfully ");
                    res.render("postgrievanceRural.ejs",{result});
                })
            })

})

app.get("/trackgrievance", (req,res)=>{
    res.render("trackgrievance.ejs")
})

app.post("/track",(req,res)=>{
    var com_id = req.body.com_id2;
    con.query("select * from complaint inner join track on complaint.complaint_id = track.complaint_id inner join department on complaint.department_id = department.department_id where complaint.complaint_id = (?)",[com_id],function(err, result, fields){
        if(err) throw err;
        console.log(result);
        if(result.length != 0){
            res.render("trackgrievance.ejs", {result});
        }else{
            alert("Invalid Grievance number.");
        }
    })
})

app.post("/track2",(req,res)=>{
    var com_id = req.body.com_id;
    con.query("select * from complaint inner join track on complaint.complaint_id = track.complaint_id inner join department on complaint.department_id = department.department_id where complaint.complaint_id = (?)",[com_id],function(err, result, fields){
        if(err) throw err;
        console.log(result);
        res.render("trackgrievance.ejs", {result});
    })
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
    useremail=email;
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
     offemail = req.body.Email;
        console.log(offemail);
     ans=officerlogim(con,offemail, password,res);


  
 })
 

 app.post("/show_complain", (req,res)=>{
    var com_id= req.body.com_id;
        console.log(com_id);
   var one=1;
        con.query("update  track set seen=(?) where complaint_id=(?)", [one,com_id], function(err, result, fields){
            con.query("select * from complaint where complaint_id=(?)", [com_id], function(err, result1, fields){
            
                res.render("offshow_complain",{result1});
    
            });
            

        });


  
 })
 app.post("/working_on_it", (req,res)=>{
    var com_id= req.body.com_id;
        console.log(com_id);
   var one=1;
        con.query("update  track set progress=(?) where complaint_id=(?)", [one,com_id], function(err, result, fields){
         
            
          res.render("officerHome");
        });


  
 })
 app.post("/solved", (req,res)=>{
    var com_id= req.body.com_id;
        console.log(com_id);
   var one=1;
        con.query("update  track set solved=(?) where complaint_id=(?)", [one,com_id], function(err, result, fields){

          res.render("officerHome");
        });


  
 })
 app.post("/transfer", (req,res)=>{
    var com_id= req.body.com_id;
    
res.render("transfer.ejs",{com_id});

  
 })
 app.post("/transfer_confirm", (req,res)=>{
    var com_id= req.body.com_id;

//****** first find the officer_id of officer and then update in complain assignment*/

    // con.query("update table complain_assignment solved=(?) where com_id=(?)", [one,com_id], function(err, result, fields){

    //     res.render("officerHome");
    //   });


  
 })
 app.post("/send_to_higher authority", (req,res)=>{
// from officer id you can find his level as well as his higher officer_id;
 // now do same as tranfer_confirm
  
 })



app.listen(port,()=>{

    console.log(`successfully port connected`);
})