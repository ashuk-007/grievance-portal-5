var a = document.getElementById('statusbarbg');
var e = document.getElementsByClassName('status')[0];
var b = document.getElementsByClassName('field1')[0];
var c = document.getElementsByClassName('field2')[0];
var d = document.getElementsByClassName('field3')[0];
var c1 = document.getElementsByClassName('circle1')[0];
var c2 = document.getElementsByClassName('circle2')[0];
var c3 = document.getElementsByClassName('circle3')[0];
var y = document.getElementsByClassName("invis")[0].innerHTML;
var z = document.getElementsByClassName("invis")[1].innerHTML;

document.addEventListener("DOMContentLoaded", check());

function check(){
    if(y == 1){
        x = "Solved";
    }else{
        if(z == 1){
            x = "In-Progress";
        }else{
            x = "Unseen";
        }
    }
    if(x == "Unseen"){
        a.classList.remove('animate');
        a.style.height = "20%"
        b.classList.add('active');
        a.classList.add('animate');
        c1.classList.add('animateCircle');
    }else if(x == "In-Progress"){
        a.classList.remove('animate');
        a.style.height = "50%";
        c.classList.add('active');
        a.classList.add('animate');
        b.innerHTML = "Seen";
        c1.classList.add('animateCircle');
        c2.classList.add('animateCircle');
    }else if(x == "Solved"){
        a.classList.remove('animate');
        a.style.height = "100%";
        d.classList.add('active');
        a.classList.add('animate');
        b.innerHTML = "Seen";
        c1.classList.add('animateCircle');
        c2.classList.add('animateCircle');
        c3.classList.add('animateCircle');
    }
}


