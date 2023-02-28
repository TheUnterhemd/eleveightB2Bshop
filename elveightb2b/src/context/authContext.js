import {createContext, useReducer, useEffect,useState} from 'react';
import {eleveightAuth} from '../firebase/config';

export const AuthContext = createContext();

export const AuthReducer = (state, action) =>{
    switch (action.type) {
        case "LOGIN": return{...state,user: action.payload};
        case "LOGOUT": return{...state,user:null};
        case "AUTH_RDY": return{user: action.payload, authIsReady: true};
        default: return state;
    }
}

export const AuthContextProvider = ({children}) => {
    const[state, dispatch] = useReducer(AuthReducer,{
        user:null,
        authIsReady: false,
    });
    const [cart, setCart] = useState(0);

useEffect(()=> {
    const unsub = eleveightAuth.onAuthStateChanged((user) =>{
        dispatch({type: "AUTH_RDY", payload:user});
        unsub();
    })
},[]);



    return(
        <AuthContext.Provider value={{ ...state, dispatch, cart, setCart }}>
        {children}
        </AuthContext.Provider>
    )
}
