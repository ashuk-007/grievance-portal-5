document.addEventListener("DOMContentLoaded", update());

function update(){
    var button = document.getElementsByClassName("status");
    console.log("In function");
    for(var i = 0; i<button.length; i++){
        if(button[i].innerHTML === "Solved"){
            console.log("in if");
            button[i].style.backgroundColor = "#3293FF";
        }
    }
}

function check(row){
    var row_id = row.id;
    console.log(row_id);
    var col = document.getElementById(row_id).querySelectorAll(".greivanceNumber");
    var data = col[0].innerHTML;
    console.log(data);
    var com = document.getElementsByName("com_id")[0];
    com.value = data;
    console.log(document.getElementsByName("com_id")[0].value);
    var myform = document.getElementById("myform");
    myform.submit();
}


function show(){
    console.log("Infunction")
    var x = document.getElementsByClassName("popup")[0];
    x.classList.toggle('active');
}

function check2(row){
    var x = document.getElementsByClassName("popup2")[0];
    x.classList.toggle('active');
    console.log("Infunction");
    var row_id = row.id;
    console.log(row_id);
    var col = document.getElementById(row_id).querySelectorAll(".greivanceNumber");
    var data = col[0].innerHTML;
    console.log(data);
    var com = document.getElementsByName("com_id_popup")[0];
    com.value = data;
    console.log(document.getElementsByName("com_id_popup")[0].value);
}