var mysql = require("mysql2")
const express = require("express");
const path = require("path");
const app = express();
const port =5000;
const hbs = require("ejs")
const alert =  require("alert");
// const popup = require('popups');
// var con = mysql.createConnection({
//     host : "localhost",
//     user : "root",
//     password : "tanish@0601",
//     database  : "Grievence"
    
    
// });
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


// app.post("/userlogin",(req,res)=>{
//     console.log("user want to login");
//   userid =req.body.email;
//     var password= req.body.password; 
//                let check=0;

//     con.connect(function(err) {
//         if (err) throw err;
//         con.query("SELECT * FROM person where email=(?)",[userid] ,function (err, result, fields) {
//           if (err) throw err;
        
//           console.log(userid);

//             if(result[0].password==password){
//                 check=1;
//                 userid=result[0].user_id;
//                 console.log(userid);

//                 res.render("postloginhome.html");

//             }
//             else{
                
//                 alert("invalid credential");
//             res.render("login.html",);
        
//         }

//         });
//       });


// });

app.listen(port,()=>{
    console.log(`successfully port connected`);
})