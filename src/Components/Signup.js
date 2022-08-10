import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.svg";
export default function Signup() {
  const history = useNavigate();
  // const [fields, setFields] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [data, setData] = useState([]);
  //console.log(fields);

  //const getdata = (e) => {
  //console.log (e.target.value)
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
    const newAccount = {
      username: username,
      email: email,
      password: password,
      createdAt: Date.now(),
    };
    if (username === "") {
      alert("name fields is required");
    } else if (email === "") {
      alert("email is required");
    } else if (!email.includes("@")) {
      alert("Please enter a valid email");
    } else if (password === "") {
      alert("password is required");
    } else if (password.length < 8) {
      alert("password length must be more than 8 characters");
    } else {
      console.log("data added succesfully");
      let data;
      try {
        data = JSON.parse(localStorage.getItem("USERKEY"));
        data.push(newAccount);
      } catch (error) {
        data = [newAccount];
      }
      localStorage.setItem("USERKEY", JSON.stringify(data));
      history("/signin");
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
