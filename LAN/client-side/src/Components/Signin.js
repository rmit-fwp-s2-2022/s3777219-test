import React from "react";
import { useState } from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import logo from "../images/logo.svg";
import Cookies from "js-cookie";
const MySwal = withReactContent(Swal);
export default function Signin(props) {
  const history = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const addData = (e) => {
    e.preventDefault();
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    fetch("/api/user/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            console.log(data);
            history("/dashboard");
          });
        } else {
          res.json().then((data) => {
            console.log(data);
            if (data.errors) {
              data.errors.length > 0 &&
                MySwal.fire({
                  icon: "error",
                  title: `Can't Login`,
                  text: data.errors[0].msg,
                });
            }
          });
          MySwal.fire({
            icon: "error",
            title: `Can't Login`,
            text: "Invalid Credentials!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // const fieldsArray = [emailField, passwordField];
    //validation
    // for (let j = 0; j < fieldsArray.length; j++) {
    //   if (fieldsArray[j].value === "") {
    //     fieldsArray[j].style.borderColor = "red";
    //     $("#" + fieldsArray[j].id)
    //       .next("p")
    //       .remove();
    //     $(
    //       "<p id ='errorMsg' style = 'color: red;'>This Value Is Required</p>"
    //     ).insertAfter(fieldsArray[j]);
    //   } else {
    //     fieldsArray[j].style.borderColor = "#ced4da";
    //     $("#" + fieldsArray[j].id)
    //       .next("p")
    //       .remove();
    //   }
    // }

    // for (let i = 0; i <= 1; i++) {
    //   // eslint-disable-next-line
    //   if (
    //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    //       fieldsArray[0].value
    //     )
    //   ) {
    //     fieldsArray[0].style.borderColor = "#ced4da";
    //     $("#" + fieldsArray[0].id)
    //       .next("p")
    //       .remove();
    //   } else {
    //     fieldsArray[0].style.borderColor = "red";
    //     $("#" + fieldsArray[0].id)
    //       .next("p")
    //       .remove();
    //     $(
    //       "<p id ='errorMsg' style = 'color: red;'>Invalid Format</p>"
    //     ).insertAfter(fieldsArray[0]);
    //     return 0;
    //   }
    //   if (
    //     /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
    //       fieldsArray[1].value
    //     )
    //   ) {
    //     fieldsArray[1].style.borderColor = "#ced4da";
    //     $("#" + fieldsArray[1].id)
    //       .next("p")
    //       .remove();
    //     if (i === 1) {
    //       fetch("http://localhost:5000/api/users/login", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           email: email,
    //           password: password,
    //         }),
    //       });
    //       // const userdata = JSON.parse(getuseArr);
    //       // if (userdata && userdata.length) {
    //       //   const userlogin = userdata.filter((user) => {
    //       //     return user.email === email && user.password === password;
    //       //   });
    //       //   if (userlogin.length === 0) {
    //       //     MySwal.fire({
    //       //       icon: "error",
    //       //       title: `Wrong Credentials`,
    //       //       text: "Try Credentials Again!",
    //       //     });
    //       //     return 0;
    //       //   } else {
    //       //     MySwal.fire(
    //       //       "Successfully LoggedIn!",
    //       //       "Welcome to LOOP AGILE NOW Dashboard!",
    //       //       "success"
    //       //     );
    //       //     Cookies.set("user_login", JSON.stringify(userlogin));
    //       //     history("/dashboard");
    //       //   }
    //       // }
    //     }
    //   } else {
    //     fieldsArray[1].style.borderColor = "red";
    //     $("#" + fieldsArray[1].id)
    //       .next("p")
    //       .remove();
    //     $(
    //       "<p id ='errorMsg' style = 'color: red;'>Try Strong Password</p>"
    //     ).insertAfter(fieldsArray[1]);
    //     return 0;
    //   }
    // }
  };

  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6 col-12">
            <div className="card h-100">
              <div className="card-body">
                <form className="mx-4">
                  <div className="mb-3">
                    <div className="text-center">
                      <img src={logo} alt="" width={240} height={140} />
                    </div>
                    <h3 className="mb-4">LOGIN</h3>

                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Email Address"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                    />
                  </div>
                  <button
                    type="submit"
                    value="Login"
                    className="btn btn-outline-dark more my-3"
                    onClick={addData}
                  >
                    LOGIN
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 mt-5">
            <h2 className="text-center center-block mb-4">
              Don't Have An Account?
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
                onClick={() => history("/signup")}
                className="btn btn-outline-dark  my-3"
              >
                CREATE AN ACCOUNT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
