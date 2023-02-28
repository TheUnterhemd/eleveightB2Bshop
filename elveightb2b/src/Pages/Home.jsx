import React from 'react'
import "./Home.css"
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect } from 'react'


export const Home = () => {
  let count = localStorage.length;
  const{setCart} = useAuthContext()
  useEffect(() => {setCart(count);},[count])
  return (
    
    <div className='home'>
      </div>
  )
}
