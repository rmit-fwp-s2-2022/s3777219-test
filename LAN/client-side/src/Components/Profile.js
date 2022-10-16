import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import logo from "../images/logo.svg";
import Swal from "sweetalert2";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Cookies from "js-cookie";
import { fetchProfile, fetchUpdateProfile } from "../utils/api";
const MySwal = withReactContent(Swal);
export default function Profile(props) {
  const history = useNavigate();
  const [info, setInfo] = useState([]);
  const [info_updated, setInfo_updated] = useState([]);
  let data;

  useEffect(() => {
    fetchProfile().then((data) => {
      console.log(data);
      setInfo(data.data);
    });
    const token = Cookies.get("session_token");
    if (token) {
      setCheck(true);
    } else {
      setCheck(false);
      MySwal.fire({
        icon: "error",
        title: `Unauthorized Access`,
        text: "Kindly Signin to access!",
      });
      history("/signin");
    }
  }, [history]);

  const [navColor] = useState("bg-dark");
  const [check, setCheck] = useState(false);

  function updateProfile() {
    const username = document.getElementById("username").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const user = {
      firstName: firstName ? firstName : info.firstName,
      lastName: lastName ? lastName : info.lastName,
      username: username ? username : info.username,
    };

    document.getElementById("email").value = "";
    document.getElementById("username").value = "";

    history("/profile");
    fetchUpdateProfile(user)
      .then((data) => {
        console.log(data);
        setInfo_updated(data.data);
      })
      .catch((err) => console.log(err));
  }
  function updateLoggedIn() {
    const username = document.getElementById("username").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const user = {
      firstName: firstName,
      lastName: lastName,
      username: username,
    };
  }
  return (
    <div>
      <Navbar color={navColor} check={check} />
      <div className="container mt-4">
        <div className="row">
          <h1 className="text-center">USER PROFILE MANAGEMENT</h1>
        </div>
        <div className="row my-4">
          <div className="col-lg-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <form className="mx-4">
                  <div className="mb-3">
                    <div className="text-center">
                      <img src={logo} alt="" width={240} height={140} />
                    </div>
                    <h3 className=" text-center mb-4">MANAGE PROFILE</h3>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      value={info.email}
                      name="email"
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="firstName"
                      className="form-control"
                      id="firstName"
                      placeholder={info.firstName}
                      name="name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="lastName"
                      className="form-control"
                      id="lastName"
                      placeholder={info.lastName}
                      name="name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="username"
                      className="form-control"
                      id="username"
                      placeholder={"username"}
                      value={info.username}
                      name="name"
                    />
                  </div>
                  <button
                    type="button"
                    value="singup"
                    className="btn btn-outline-dark my-3"
                    onClick={updateProfile}
                  >
                    UPDATE PROFILE
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
