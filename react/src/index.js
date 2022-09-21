import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
///////////////////////////////////////////

const axios = require("axios");
async function test() {
  try {
    const res = await axios.post(
      "http://localhost:4000/api/posts/user/createUser",
      {
        email: "j204u20jn@gmail.com",
        username: "fejwfj2009ljc",
        password: "passwordtest1",
        firstname: "fwjfjwoi",
        lastname: "-9wrfops",
      }
    );
  } catch (err) {
    console.log(err);
  }
  // if (res.status === 200) {
  //   console.log(res.data);
  // }
}

// test();

/////////////////////
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
