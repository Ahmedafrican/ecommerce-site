import React, { useContext } from 'react'
import img1 from '../../Assets/images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'

export default function Navbar() {
  let{userIsLoggedIn,setUserIsLoggedIn} = useContext(AuthContext)
  let navigate = useNavigate()
  function logOut(){
    setUserIsLoggedIn(false)
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container">
      <Link className="navbar-brand" to={'/home'}>
        <img src={img1} alt="Logo" className="d-inline-block align-text-top"/>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
       {userIsLoggedIn ?  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to={'/home'}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/brands'}>Brands</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/cart'}>Cart</Link>
          </li>
        </ul> : null}

        <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
          <li className='nav-item d-flex align-items-center'>
            <i className='fab mx-2 fa-facebook'></i>
            <i className='fab mx-2 fa-twitter'></i>
            <i className='fab mx-2 fa-instagram'></i>
            <i className='fab mx-2 fa-youtube'></i>
            <i className='fab mx-2 fa-tiktok'></i>
          </li>
          {!userIsLoggedIn ? <>
            <li className='nav-item'>
            <Link className='nav-link' to={'/login'}>Login</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to={'/register'}>Register</Link>
          </li>
          </> :  <li className='nav-item'>
            <span onClick={logOut} className='nav-link cursor-pointer'>Logout</span>
          </li>}
          
         
        </ul>
      </div>
    </div>
  </nav>
  )
}
