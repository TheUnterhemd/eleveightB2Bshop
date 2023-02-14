import { useEffect,useState } from "react"
import {eleveightAuth, eleveightDB} from '../firebase/config'
import {useAuthContext} from './useAuthContext'

export default function useLogin() {
const [isCancelled, setIsCancelled] = useState(false);
const [error, setError] = useState(null);
const [isPending, setIsPending] = useState(false);
const {dispatch} =  useAuthContext();

const login =async (email,password) =>{

    try {
        const resultLog = await eleveightAuth.signInWithEmailAndPassword(email,password);

        await eleveightDB.collection('users').doc(resultLog.user.uid).update({online:true});

        dispatch({type:"LOGIN", payload:resultLog.user})

        if(!isCancelled){
            setIsPending(false);
            setError(null);
        }
        
    } catch (error) {
        if(isCancelled){
            setIsPending(false);
            setError(error.message);
        }
        
    }
}
useEffect(()=>{
    return () => setIsCancelled(true);
},[]);
return{login,isPending,error}
}
