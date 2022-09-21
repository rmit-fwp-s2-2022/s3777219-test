import React, { useState,useEffect } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
export default function Header(props) {
const [check,setCheck] = useState(false);
let data;
data = JSON.parse(localStorage.getItem("user_login"));
  
useEffect(() => {
    if(data){
   setCheck(true); 
    }
  },[data]);

  return (

    <div className={`wrapper ${props.img} `}>

      <Navbar check = {check}/>
<div className="container">
<div className="row mt-5">
  <h1 className='text-white'>
    {props.title}
  </h1>
</div>
</div>
<div className="container">
  <div className="row mt-5">
    <h4 className='text-white'>
      {props.text}
    </h4>
  </div>
</div>
<div className="container my-5">
  <div className="row mt-5 more-row">
    <Link to={`/${props.btn}`}>
  <button type="button" className="btn btn-outline-light more">{props.btn}</button>
  </Link>
  </div>
</div>
</div>
  )
}
