document.getElementById('feadbackSeand').onclick = function () {
    fname = document.getElementById('fname').value;
    lname = document.getElementById('lname').value;
    subject = document.getElementById('subject').value;

    if(fname == "" || lname == "" || subject == "")
    {
        alert("Има пропуснати полета, които трябва да се попълнат");
        return false;
    }
    else
    {
        alert("Вашето съобщение беше изпратено успешно");
    }
};
