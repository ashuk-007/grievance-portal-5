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
var offemail;
var useremail;
// const { logim} = require('./login')
const griever = require('./addComplaint')
var offemail;
var date;
let date_time = new Date();

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



 app.post("/addGrievance",async (req,res)=>{

    var department = req.body.department;
    var details = req.body.details;
    // var image= req.file;
    // var image_data = fs.readFileSync(image.path);
    // var doc= req.body.file.uploadImage2;
    // var doc_data = fs.readFileSync(doc.path);
    var state = req.body.state;
    var tehsil = req.body.tehsil;
    var address = req.body.panchayat;
    var district = req.body.district;
    var block = req.body.block;
    var pincode = req.body.pincode;
    let date_time = new Date();
    let date = date_time.toISOString().split('T')[0];
    console.log(date_time);
    console.log(date);
    // const data = fs.readFileSync(image.path);

    griever(con, useremail, date, department, details, state, tehsil, address, district, block, pincode)
    res.render("userHome");
 });

 app.post("/officerlogin", (req,res)=>{
    var password = req.body.password;
     offemail = req.body.Email;
        console.log(offemail);
     ans=officerlogim(con,offemail, password,res);


  
 })
 
//  app.post("/officerlogin", (req,res)=>{
  
//     var deppt = req.body.department;
//     var details = req.body.details;
//     var state = req.body.state;
//     var tehsil = req.body.tehsil;
//     var address = req.body.panchayat;
//     var block= req.body.block;
//     var pin = req.body.pincode;
//     var com_id= Math.floor(Math.random() * 100000);
//     var block_id ;
//     con.connect(function(err){
//         con.query("SELECT * from pincode where pin_code = (?) ", [pin], function(err, result, fields){

//         if(err){
//             console.log("PROBLEM");
//             throw err;
//         }
//         block_id=result[0]
      
//     })
//         con.query("select * from complaint natural join track where person_id=(?)",[result[0].], function(err, result1, fields){
//             if(err) throw err;
//             res.render("userHome.ejs",{result1});

//         })
    
// });
  
//  })
app.post("/addGrievance",async (req,res)=>{

    var department = req.body.department;
    var details = req.body.details;
    var image= req.body.images;
    var doc= req.body.document;
    var state = req.body.state;
    var tehsil = req.body.tehsil;
    var address = req.body.panchayat;
    var district = req.body.district;
    var block = req.body.block;
    var pincode = req.body.pincode;
    let date = ("0" + date_time.getDate()).slice(-2);
    griever(con, useremail, department, details, image, doc, state, tehsil, address, district, block, pincode)
    res.render("userHome");
 });
 app.post("/show_complain", (req,res)=>{
    var com_id= req.body.com_id;
        console.log("CKSDKC",com_id);
   var one=1;
        con.query("update  track set seen=(?) where complaint_id=(?)", [one,com_id], function(err, result, fields){
            con.query("select * from complaint natural join complaint_assignment natural join officer where complaint_id=(?)", [com_id], function(err, result1, fields){
            
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

 app.get("/transfer",(req,res)=>{
    res.render("transfer.ejs");
 })

 app.post("/transfer",(req,res)=>{
    var com_id= req.body.com_id;
    var lvl = req.body.level;
    console.log("lvlv of ofif",com_id);
    con.query("select * from department ", function(err, result, fields){
        if(err) throw err;
        console.log(result);
        res.render("transfer",{com_id, lvl,result});
    })
    
})

 app.post("/transfer_confirm", (req,res)=>{
    var com_id= req.body.com_id;
    var block_id = req.body.block_id;
    //var department = req.body.department;
    var department = "Water";
    var level = req.body.level;
    console.log("com_id",com_id);
    con.query('SELECT officer_id FROM officer where block_id = (?) AND department = (?) AND lvl = (?)',[block_id, department, level], (err, result) =>{
        if(err) throw err;
        officer_temp = result[0].officer_id;
        console.log(result);
        con.query('update  complaint_assignment set  officer_id=(?) where complaint_id =(?)',[officer_temp,com_id], (err, result) =>{
            if(err) throw err;
            console.log("complaint tranfererd");
        });
    });


res.render("officerHome");

  
 })

 app.post("/send_to_higher authority", (req,res)=>{


  
 })



app.listen(port,()=>{

    console.log(`successfully port connected`);
})