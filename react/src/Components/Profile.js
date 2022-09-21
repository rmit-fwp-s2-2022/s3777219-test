import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react'
import logo from "../images/logo.svg";
import Swal from 'sweetalert2'
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);
export default function Profile(props) {
  const history = useNavigate();
  const [info] = useState([]);
  const [info_updated,setInfo_updated] = useState([]);
  let data_old ,data;
  data_old = JSON.parse(localStorage.getItem("user_login"));

if(data_old != null){
  let data2_old = data_old[0];
  for (let j = 0; j <= 3; j++) {
    var key = Object.keys(data2_old)[j];
    info.push(data2_old[key]);
  }
}

  useEffect(() => {
    if (data_old) {
      setCheck(true);
    }
    else {
      setCheck(false)
      MySwal.fire({
        icon: 'error',
        title: `Unauthorized Access`,
        text: 'Kindly Signin to access!'
      })
      history('/signin')
    }
  }, [data_old, history]);

    const [navColor] = useState('bg-dark');
    const [check, setCheck] = useState(false);

    function updateProfile(){
      const email = document.getElementById('email').value;
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const passwordElement = document.getElementById('password');
      const users = {
        username: username,
        email: email,
        password: password,
        createdAt: info[3]
      };
      if(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(password))
      {
        passwordElement.style.borderColor = '#ced4da'
        $('#'+passwordElement.id).next('p').remove();
        data = [users];
      localStorage.setItem("USERKEY", JSON.stringify(data));
      updateLoggedIn();
      MySwal.fire(
        'Successfully Updated Profile!',
        'You can update it anytime!',
        'success'
      )
      document.getElementById('email').value = '';
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
     
      history('/profile')
      data = JSON.parse(localStorage.getItem("user_login"));
      if(data != null){
        let test = []
        let data2 = data[0];
        for (let j = 0; j <= 2; j++) {
          var key = Object.keys(data2)[j];
          var key2 = data2[key]
          test.push(key2)
        }
        setInfo_updated(test);
       
      }
    }else{
      passwordElement.style.borderColor = 'red'
            $('#'+passwordElement.id).next('p').remove();
            $( "<p id ='errorMsg' style = 'color: red;'>Try Strong Password</p>" ).insertAfter( passwordElement );
            return 0;
    }
  
    }
 function updateLoggedIn(){
      const email = document.getElementById('email').value;
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const users = {
        username: username,
        email: email,
        password: password,
        createdAt: info[3]
      };
        data = [users];
      localStorage.setItem("user_login", JSON.stringify(data));
    }
    return (
    <div>
    <Navbar color={navColor} check={check} />
    <div className='container mt-4'>
        <div className="row">
      <h1 className='text-center'>
        USER PROFILE MANAGEMENT 
      </h1>
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
                      value={`${info_updated.length === 0 ? info[1]: info_updated[1]}`}
                      name="email" disabled
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="username"
                      className="form-control"
                      id="username"
                      placeholder={`${info_updated.length === 0 ? info[0]: info_updated[0]}`}
                      name="name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder={`${info_updated.length === 0 ? info[2]: info_updated[2]}`}
                      name="password"
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
  )
}
