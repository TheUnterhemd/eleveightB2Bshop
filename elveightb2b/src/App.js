import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import { Home,IndexNav,Register,Login,Kites,Boards,Foils,Wings,Bars,Accesoires,Backdoor,Item, Cart} from '../src/Pages/index';

import { useAuthContext } from './hooks/useAuthContext';
import { eleveightDB } from './firebase/config';
import { useEffect, useState } from 'react';


function App() {
  const{user, authIsReady} = useAuthContext();
  const [currentUser,setCurrentUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  setTimeout(() =>{
    setCurrentUser(user);
  },1000)
  
  useEffect(() => {
    const isAdmin = eleveightDB.collection("users").doc(currentUser?.uid).get().then((doc) => {
      if (doc.exists) {
          const realAdmin = doc.data();
          setAdmin(realAdmin.admin)
      } else {
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
    
  },[currentUser])

  
  
  return (
    <div className='App'>
      {authIsReady &&(
      <BrowserRouter>
      <div className="container">
        <IndexNav item={admin}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={user ? <Cart/>: <Home/>}/>
        <Route path="/kites" element={user ? <Kites/>: <Home/>}/>
        <Route path="/kites/:name/*" element={user ? <Item/>: <Home/>}/>
        <Route path="/boards" element={user ? <Boards/>: <Home/>}/>
        <Route path="/boards/:name/*" element={user ? <Item/>: <Home/>}/>
        <Route path="/foils" element={user ? <Foils/>: <Home/>}/>
        <Route path="/foils/:name/*" element={user ? <Item/>: <Home/>}/>
        <Route path="/wings" element={user ? <Wings/>: <Home/>}/>
        <Route path="/wings/:name/*" element={user ? <Item/>: <Home/>}/>
        <Route path="/bars" element={user ? <Bars/>: <Home/>}/>
        <Route path="/bars/:name/*" element={user ? <Item/>: <Home/>}/>
        <Route path="/accesoires" element={user ? <Accesoires/>: <Home/>}/>
        <Route path="/accesoires/:name/*" element={user ? <Item/>: <Home/>}/>
        <Route path="/backdoor" element={admin === true ? <Backdoor/>: <Home/>}/>

      </Routes>
      </div>
      
      </BrowserRouter>

    )}
    </div>
  );
}

export default App;
