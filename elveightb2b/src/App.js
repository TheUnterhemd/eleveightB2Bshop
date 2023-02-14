import './App.css';
import { BrowserRouter,Navlink,Link,Routes, Route } from 'react-router-dom'
import { Home,IndexNav,Register,Login,Kites,Boards,Foils,Wings,Bars,Accesoires} from '../src/Pages/index';

import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const{user, authIsReady} = useAuthContext();
  return (
    <div className='App'>
      {authIsReady &&(
      <BrowserRouter>
      <div className="container">
        <IndexNav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/kites" element={user ? <Kites/>: <Home/>}/>
        <Route path="/boards" element={user ? <Boards/>: <Home/>}/>
        <Route path="/foils" element={user ? <Foils/>: <Home/>}/>
        <Route path="/wings" element={user ? <Wings/>: <Home/>}/>
        <Route path="/bars" element={user ? <Bars/>: <Home/>}/>
        <Route path="/accesoires" element={user ? <Accesoires/>: <Home/>}/>

      </Routes>
      </div>
      
      </BrowserRouter>

    )}
    </div>
  );
}

export default App;
