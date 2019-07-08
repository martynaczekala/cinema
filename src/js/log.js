var found = false;
var usr_data = JSON.parse(users_data);
var users = Object.keys(usr_data).length;
var isValid = false;

var log_button = document.getElementById('log');
log_button.onclick = function () {
    var login = document.getElementById('mail').value;
    var password = document.getElementById('haslo').value;
    for (i = 0; i < users; i++) {
        if (usr_data[i].mail == login && usr_data[i].password == password) {
            found = true;
        }
var re1 = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
        if (re1.test(usr_data[i].password)) {
            isValid = true;
        }
    }

    if (found && isValid) {
        open("./index.html", "_self");
       //Open the booking panel
    } else {
        alert("The user name or password is incorrect. Try again.")
    }
}
