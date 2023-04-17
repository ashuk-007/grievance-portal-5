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