import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useLogin from "../hooks/useLogin"
import './Login.css'

export const Login = () => {
  const[email,setEmail] =useState("");
  const[password,setPassword] =useState("");
  const{login,isPending,error} = useLogin();

  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    login(email,password);
    navigate("/");
  };


  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
      <label className="box">
        <span>Email:</span>
        <input type="email" required onChange={(e)=> setEmail(e.target.value)} value={email} />
      </label>
      <label className="box">
        <span>Password:</span>
        <input type="password" required onChange={(e)=> setPassword(e.target.value)} value={password} />
      </label>
      {!isPending && <button className="btn">Log In</button>}
        {isPending && (
          <button  disabled>
            Loading...
          </button>
        )}
        {error && <div className="error">{error}</div>}

      </form>

    </div>
  )
}
