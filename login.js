var mysql = require("mysql2")
const express = require("express");
const path = require("path");
const app = express();
const port =4000;
const hbs = require("ejs")
const alert =  require("alert");

module.exports = function(con,email, password,res){
    con.connect(function(err){
        if(err) {
            console.log('PROBLEM!!!');
            throw err;
        }
        console.log("DB connect");
        email='iit2021128@iiita.ac.in'
        con.query("SELECT * from person where email = (?) ", [email], function(err, result, fields){
            if (err) throw err;

            if(result.length==0){
                res.render("userlogin");

            }
             if(result[0].pass==password){
              res.render("userHome");
                }
                else{
                    
                  res.render("userlogin");
            
            }

        })
    });
    con.end();
}