import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
///////////////////////////////////////////

const axios = require("axios").default;
async function test() {
  const res = await axios.post("http://localhost:4000/user", {
    email: "te3st@gmail.com",
    username: "hello1",
    password: "passwordtest1",
    firstname: "nguyen1",
    lastname: "phan1",
  });
  if (res.status === 200) {
    console.log(res.data);
  }
}

test();

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
