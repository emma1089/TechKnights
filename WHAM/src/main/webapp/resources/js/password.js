var password = document.getElementById("user-pw")
  , confirm = document.getElementById("user-pw-repeat");

function validate(){
  if(password.value != confirm.value) {
    confirm.setCustomValidity("Passwords do not Match");
  } else {
    confirm.setCustomValidity('');
  }
}
password.onchange = validate;
confirm.onkeyup = validate;