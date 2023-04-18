var mysql = require("mysql2")
const express = require("express");
const path = require("path");
const app = express();
const port =4000;
const hbs = require("ejs")
const alert =  require("alert");
const user = require("./user");
// function sleep(ms) {
//     return new Promise((resolve) => {
//       setTimeout(resolve, ms);
//     });
//   }
//   function delay(time) {
//         return new Promise(resolve => setTimeout(resolve, time));
//     }  

module.exports = async function(con, useremail, date, department, details, state, tehsil, address, district, block, pincode){
    con.connect(function(err){
        
        if(err) throw err;

        let check = true;

        let comp_id = Math.floor(Math.random() * 100000);
        let complaint_id = "complaint " + comp_id;
        let user_temp, dept_temp, block_temp;
        // let date = '2023-04-12';
        let date_temp = date.replaceAll('/', '-');
        date_temp = String(date_temp);
        con.query('SELECT person_id from person where email = (?)', [useremail], function(err, result, fields){
            // console.log(result[0]);
            if(err) throw err;
            // else{
            else{
                 user_temp = result[0].person_id;
                 console.log(user_temp);
                //  user_temp = user_id[0].user_id;
            }
            // }
        });

        con.query('SELECT block_id from area where block_name = (?)', [block], function(err, result, fields){
            // console.log(result[0]);
            if(err) throw err;
            // else{
             else {
                block_temp = result[0].block_id;
                console.log('BLOCKSDSDS')
                console.log(block_temp);
                // block_temp = block_id[0].block_id;
             }
            // }
        });

        con.query('SELECT department_id from department where department_name = (?)', [department], function(err, result, fields){
            // console.log(result[0]);
            if(err) throw err;
            // else{
            else {
                dept_temp = result[0].department_id;
                console.log("DEPERTMENT")
                console.log(dept_temp);
                // dept_temp = department_id[0].department_id;
            }
            // }
        });
        

        setTimeout(() => {
            console.log('Function executed after 2 seconds');
            console.log(user_temp);
            console.log(dept_temp);
            console.log(date_temp);
            con.query('INSERT INTO complaint (complaint_id, person_id,  block_id, department_id, complaint_date, address, complaint_description, image) VALUES (?, ?, ?, ?, ?, ?, ?)',[complaint_id, user_temp, block_temp, dept_temp, date_temp , address, details], (error, results) => {
                if(err) throw err;
                // console.log(results);
                console.log('LASTOFUS')
            });
          }, 5000);
          let officer_temp, officer_level;
          setTimeout(() => {
            con.query('SELECT officer_id FROM officer where block_id = (?) AND department = (?) AND lvl = (?)',[block_temp, department, '1'], (error, result) =>{
                if(err) throw err;
                officer_temp = result[0].officer_id;
                console.log(result);
            });
        }, 5000);

        setTimeout(() => {
            con.query('INSERT INTO complaint_assignment (complaint_id, officer_id) VALUE (?, ?)',[complaint_id, officer_temp], (error, result) =>{
                if(err) throw err;
                console.log(result);
            });
        }, 10000);
        
    });
}