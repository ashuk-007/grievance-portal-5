var mysql = require("mysql2")
const express = require("express");
const path = require("path");
const app = express();
const port =4000;
const hbs = require("ejs")
const alert =  require("alert");
const { response } = require("express");
var con = mysql.createConnection({
    host : "localhost",
    user : "root",
   password : "India@no.1",
    database  : "gri"
});
function getDept(){
    con.connect(function(err){
        if(err){
            console.log("PROBLEM");
            throw err;
        }
        con.query("SELECT * from department", function(err, result, fields){
            if(err) throw err;
            console.log(result);
            // res.render("postgrievanceRural.ejs",{result});
        })
    })
}

