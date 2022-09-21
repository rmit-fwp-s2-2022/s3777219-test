import React from 'react'
import logo from '../images/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
export default function Navbar(props) {
  const history = useNavigate();
  function logout(){
    localStorage.removeItem("user_login");
    history('/')
  }
  return (
    <div>
    <nav className={`navbar navbar-expand-lg ${props.color === 'bg-dark'?'bg-dark':'nav-col'}`}>
  <div className="container">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="" className='logo'/>
    </Link>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" to='/signup' >SIGN UP</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" to='/signin' >SIGN IN</Link>
        </li>
        <li className={`nav-item ${props.check === true?'d-block':'d-none'}`}>
          <Link className="nav-link active text-white" aria-current="page" to="/dashboard">DASHBOARD</Link>
        </li>
        <li className={`nav-item ${props.check === true?'d-block':'d-none'}`}>
          <Link className="nav-link active text-white" aria-current="page" to="/profile">PROFILE</Link>
        </li>
        <li className={`nav-item ${props.check === true?'d-block':'d-none'}`}>
          <Link className="nav-link active text-white" aria-current="page" to="/posts">POSTS</Link>
        </li>
        <li className={`nav-item ${props.check === true?'d-block':'d-none'}`}>
          <Link onClick={logout} className="nav-link active text-white" aria-current="page" to="/">LOGOUT</Link>
        </li>
        
      </ul>
      </div>
  </div>
</nav>
    </div>
  )
}
