import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser, initUsers } from "../LocalStorage/LocalStorage";
import logo from "../images/logo.svg";

export default function Signin(props) {
  // const [fields, setFields] = useState({
  //   email: "",
  //   username: "",
  //   password: "",
  // });
  const history = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [data, setData] = useState([]);

  // const handleInputChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.targer.value;
  //   console.log("value: ", value);
  //   const temp = {
  //     email: fields.email,
  //     username: fields.username,
  //     password: fields.password,
  //   };
  //   temp[name] = value;
  //   setFields(temp);
  // };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   initUsers();
  //   const verified = verifyUser(email, username, password);

  //   //verified user
  //   if (verified === true) {
  //     props.loginEmail(email);

  //     //Navigate to the home page.
  //     navigate("/");
  //     return;
  //   }
  //   //reset password field to blank

  //   const temp = { username: username, email: email, password: password };
  //   temp.password = "";
  //   setFields(temp);
  // };
  // const history = useNavigate();
  // const [fields, setFields] = useState({
  //   email: "",
  //   password: "",
  // });
  // const [data, setData] = useState([]);
  // console.log(fields);

  // const getdata = (e) => {
  //   //console.log (e.target.value)
  //   const { value, name } = e.target;
  //   //console.log (value,name)
  //   setFields(() => {
  //     return {
  //       ...fields,
  //       [name]: value,
  //     };
  //   });
  // };
  const addData = (e) => {
    e.preventDefault();
    const getuseArr = localStorage.getItem("USERKEY");
    if (email === "") {
      alert("email is required");
    } else if (!email.includes("@")) {
      alert("Please enter a valid email");
    } else if (password === "") {
      alert("password is required");
    } else if (password.length < 8) {
      alert("password length must be more than 8 characters");
    } else {
      const userdata = JSON.parse(getuseArr);
      if (userdata && userdata.length) {
        const userlogin = userdata.filter((user) => {
          return user.email === email && user.password === password;
        });
        if (userlogin.length === 0) {
          alert("invalid detail");
        } else {
          console.log("user login succesfully");
          localStorage.setItem("user_login", JSON.stringify(userlogin));
          history("/");
        }
      }
    }
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
