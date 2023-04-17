document.addEventListener("DOMContentLoaded", complainID());

function complainID(){
    var data = document.getElementById("data").innerHTML;
    for(var i = 0; i<4; i++){
        var field = document.getElementsByName("com_id")[i];
        field.value = data;
        console.log(field.value);
    }
}