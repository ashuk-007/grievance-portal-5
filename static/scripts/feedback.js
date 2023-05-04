function openFeedback(){
    var a = document.getElementsByClassName("feedback_window")[0];
    var b = document.getElementsByClassName("blocker")[0];
    a.style.display = "block";
    b.style.display = "block";

}

function closeFeedback(){
    var a = document.getElementsByClassName("feedback_window")[0];
    var b = document.getElementsByClassName("blocker")[0];
    a.style.display = "none";
    b.style.display = "none";
}