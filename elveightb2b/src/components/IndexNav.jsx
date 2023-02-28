import React, { useEffect,useState } from 'react'
import {Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import useLogout  from '../hooks/useLogout'


import './IndexNav.css';
import {logo} from '../Pages/index'


export const IndexNav = ({item}) => {
  const { user } = useAuthContext()
  const { logout , isPending} = useLogout();
  const {cart} = useAuthContext()

  return (
    <div>
      <nav>
        <Link to={"/"}><img src={logo} alt=""/></Link>
        <div className="links">
        {user && (
          <>
          <Link to="/kites">Kites</Link>
          <Link to="/boards">Boards</Link>
          <Link to="/foils">Foils</Link>
          <Link to="/wings">Wings</Link>
          <Link to="/bars">Bars</Link>
          <Link to="/accesoires">Accesoires</Link></>)}
          {item && (
            <Link to="/backdoor">Admin</Link>
          )}
        </div>
        {!user && (<div className="login-btn">
          <Link to={'/register'}><button className="btn">Register</button></Link>
          <Link to={'/login'}><button className="btn">Login</button></Link>
        </div>)}
        {user && (<div className="cart">
          <Link to={'/cart'}><button className="btn">Cart({cart})</button></Link>
          <button className='btn' onClick={logout}>Log Out</button>
        </div>)}
      </nav>
    </div>
  )
}
