import React from 'react'
import {NavLink,Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import useLogout  from '../hooks/useLogout'


import './IndexNav.css';
import {logo} from '../Pages/index'


export const IndexNav = ({item}) => {
  const { user } = useAuthContext()
  const { logout , isPending} = useLogout();
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
        {!user && (<div className="login">
          <Link to={'/register'}>Register</Link>
          <Link to={'/login'}>Login</Link>
        </div>)}
        {user && (<div className="login">
          <Link to={'/cart'}>Shopping Cart</Link>
          <button onClick={logout}>Log Out</button>
        </div>)}
      </nav>
    </div>
  )
}
