import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.svg";
import $ from "jquery";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
export default function Signup() {
  const history = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();

  const addData = (e) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    let day = today.getDay();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const formattedToday = dd + "/" + mm + "/" + yyyy + "/" + weekday[day];
    e.preventDefault();
    const newAccount = {
      username: username,
      email: email,
      password: password,
      createdAt: formattedToday,
    };
    const nameField = document.getElementById("username");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
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
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          fieldsArray[1].value
        )
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
        if (i === 2) {
          fetch("/api/user/signup", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
              username: username,
              firstName: "",
              lastName: "",
            }),
          }).then((res) => {
            if (res.status === 200) {
              res.json().then((data) => {
                console.log(data);
                localStorage.setItem("user", JSON.stringify(data));
                MySwal.fire(
                  "Successfully Registered!",
                  "Welcome to LOOP AGILE NOW Team!",
                  "success"
                );
                history("/signin");
                // Cookies.set("token", data.token);
              });
            } else {
              res.json().then((data) => {
                console.log(data.message);
                MySwal.fire({
                  icon: "error",
                  title: `Can't Sign Up`,
                  text: data.message,
                });
              });
            }
          });
          // MySwal.fire(
          //   "Successfully Registered!",
          //   "Welcome to LOOP AGILE NOW Team!",
          //   "success"
          // );
          // let data;
          // try {
          //   data = JSON.parse(localStorage.getItem("USERKEY"));
          //   data.push(newAccount);
          // } catch (error) {
          //   data = [newAccount];
          // }
          // localStorage.setItem("USERKEY", JSON.stringify(data));
        }
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
  };

  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6 col-12 mt-5">
            <h2 className="text-center center-block mb-4">
              Already Have An Account?
            </h2>
            <ul className="text-center my-3">
              <li className="my-2">
                &#10004; Daily Posting and engaging with team members through
                this platform.
              </li>
              <li className="my-2">
                &#10004; Be a part of Professional and Trained IT Consultants.
              </li>
              <li className="my-2">
                &#10004; Much more Facilities to boost your career.
              </li>
            </ul>
            <h5 className="text-center">
              You can join us by creating a new account instantly.
            </h5>
            <div className="text-center my-3">
              <button
                type="submit"
                onClick={() => history("/signin")}
                className="btn btn-outline-dark  my-3"
              >
                LOGIN HERE
              </button>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="card h-100">
              <div className="card-body">
                <form className="mx-4">
                  <div className="mb-3">
                    <div className="text-center">
                      <img src={logo} alt="" width={240} height={140} />
                    </div>
                    <h3 className="mb-4">Signup</h3>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="username"
                      className="form-control"
                      id="username"
                      placeholder="username"
                      name="name"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                    />
                  </div>
                  <button
                    type="submit"
                    value="singup"
                    className="btn btn-outline-dark my-3"
                    onClick={addData}
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
