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
        console.log(email);
        // email='iit2021128@iiita.ac.in'
        // email= toString(email);
        con.query("SELECT * from person where email = (?) ", [email], function(err, result, fields){
            if (err) throw err;

            if(result.length>0){
             
             if(result[0].pass==password){
                con.query("select * from complaint natural join track where person_id=(?)", [result[0].person_id], function(err, result1, fields){
                    console.log(result1);
                    res.render("userHome",{result1});

                });

                }}
                else{
                    
                  res.render("userlogin");
            
            }

        })
    });
}