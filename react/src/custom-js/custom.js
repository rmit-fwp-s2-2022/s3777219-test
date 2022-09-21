import $ from "jquery";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
export function validate(
  event,
  nameFieldParam,
  emailFieldParam,
  passwordFieldParam
) {
  const nameField = document.getElementById(nameFieldParam);
  const emailField = document.getElementById(emailFieldParam);
  const passwordField = document.getElementById(passwordFieldParam);
  const fieldsArray = [nameField, emailField, passwordField];

  for (let j = 0; j < fieldsArray.length; j++) {
    if (fieldsArray[j].value === "") {
      fieldsArray[j].style.borderColor = "red";
      $("#" + fieldsArray[j].id)
        .next("p")
        .remove();
      $(
        "<p id ='errorMsg' style = 'color: red;'>This Value Is Required</p>"
      ).insertAfter(fieldsArray[j]);
    } else {
      fieldsArray[j].style.borderColor = "#ced4da";
      $("#" + fieldsArray[j].id)
        .next("p")
        .remove();
    }
  }

  for (let i = 1; i <= 2; i++) {
    // eslint-disable-next-line
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fieldsArray[1].value)
    ) {
      fieldsArray[1].style.borderColor = "#ced4da";
      $("#" + fieldsArray[1].id)
        .next("p")
        .remove();
    } else {
      fieldsArray[1].style.borderColor = "red";
      $("#" + fieldsArray[1].id)
        .next("p")
        .remove();
      $(
        "<p id ='errorMsg' style = 'color: red;'>Invalid Format</p>"
      ).insertAfter(fieldsArray[1]);
      return 0;
    }
    if (
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
        fieldsArray[2].value
      )
    ) {
      fieldsArray[2].style.borderColor = "#ced4da";
      $("#" + fieldsArray[2].id)
        .next("p")
        .remove();
    } else {
      fieldsArray[2].style.borderColor = "red";
      $("#" + fieldsArray[2].id)
        .next("p")
        .remove();
      $(
        "<p id ='errorMsg' style = 'color: red;'>Try Strong Password</p>"
      ).insertAfter(fieldsArray[2]);
      return 0;
    }
  }
  var element = document.getElementById("errorMsg");
  if (typeof element != "undefined" && element != null) {
    MySwal.fire(
      "Successfully Registered!",
      "Welcome to LOOP AGILE NOW Team!",
      "success"
    );
  }
}
