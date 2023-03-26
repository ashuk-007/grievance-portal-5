var mysql = require("mysql2")
const express = require("express");
const path = require("path");
const app = express();
const port =4000;
const hbs = require("ejs")
const alert =  require("alert");

module.export = function(email, password){
    console.log("ENtered function");
    con.connect(function(err){
        if(err) {
            console.log('PROBLEM!!!');
            throw err;
        }
        console.log("DB connect");
        con.query("SELECT count(*) as counter from person where email = (?) and password = (?)", [email], [password], function(err, result, fields){
            console.log(result[0].counter);
            if(err) throw err;
            else if(result[0].counter==1){
                console.log("UNIQUE");
                return 1;
            }
            else{
                return 0;
            }
        })
    });
    con.end();
}