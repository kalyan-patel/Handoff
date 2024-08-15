import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

import mailIcon from '../images/mail-icon.png'
import profIcon from '../images/profile-icon.png'

import 'bootstrap/dist/css/bootstrap.min.css'
import './Navbar.css'
import '../index.css'


function DropdownOrLogin() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  async function handleLogout() {
    setError("");

    try{
      await logout();
      navigate("/");
    } catch {
      setError("Failed to log out");
      console.log(error);
    }
  }


  if (currentUser) {
    return(
      <>
        <div className="nav-dropdown">
          <button className="nav-link active">
            <strong>Welcome, {currentUser.displayName}</strong>
          </button>
          <div className="nav-dropdown-menu">
            <a className="nav-link dropdown-item" href="/mylistings">My Listings</a>
            <a className="nav-link dropdown-item" href="/mylistings">My Favorites</a>
            <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <a className="nav-link active" href="/login">
        <strong>Log In/Register</strong>
      </a>
    </>
  );

}




export default function Navbar() {

  return (
    <>
      <nav className="navbar navbar-expand navbar-light">
        <div className="container">
          <a href="/" className="navbar-logo"><strong>Tufts Handoff</strong></a>
          <button 
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#toggleMobileMenu"
            aria-controls="toggleMobileMenu"
            aria-expanded="false"
            aria-lable="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="toggleMobileMenu">
            <ul className="navbar-nav ms-auto text-center">
              <li>
                <a className="nav-link" href="/newlisting">Add a Listing</a>
              </li>
              <li>
                <a className="nav-link" href="/messages">My Messages</a>
              </li>
              <li className="nav-profile">
                {DropdownOrLogin()}
              </li>
            </ul>
          </div>
        </div>
      </nav>







    
      {/* <nav className="navbar navbar-expand">
        <div className="container">
          <a href="/" className="navbar-logo">
            <strong>Tufts Handoff</strong>
          </a>
          <ul className="navbar-nav">

            <li className="nav-item">
              <a href="/newlisting" className="nav-link">Add a Listing</a>
            </li>

            <li className="nav-item">
              <a href="/mylistings" className="nav-link active">My Listings</a>
            </li>

            <li className="nav-item">
              <a href="/messages"><img className="nav-img" src={mailIcon} alt="Messages" /></a>
            </li>

            <li className="nav-item">
              <a href="#" className="nav-link active" onClick={handleLogout}>Logout</a>
            </li>

            <li className="nav-item">
              {DropdownOrLogin()}
            </li>
          </ul>
        </div>
      </nav>  */}
    </>
  )
}
