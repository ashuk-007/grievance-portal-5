document.addEventListener("DOMContentLoaded",button1());

function button1(){
    var button = document.getElementsByClassName("status");
    console.log("In function");
    for(var i = 0; i<button.length; i++){
        console.log(button[i].innerHTML);
        if(button[i].innerHTML == "Solved"){
            console.log("in if");
            button[i].style.backgroundColor = "#3293FF";
        }
    }
}

function update(row){
    var row_id = row.id;
    console.log(row_id);
    var col = document.getElementById(row_id).querySelectorAll(".greivanceNumber");
    var data = col[0].innerHTML;
    console.log(data);
    var com = document.getElementsByName("com_id")[0];
    com.value = data;
    console.log(document.getElementsByName("com_id")[0].value);
}

