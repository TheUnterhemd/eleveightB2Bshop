import { useEffect, useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { eleveightDB, eleveightAuth } from "../firebase/config"
import { useNavigate } from "react-router-dom";

export default function useLogout() {
const [isCancelled, setIsCancelled] = useState(false);
const [error, setError] =useState(null);

const [isPending, setIsPending] = useState(false);
const {dispatch} = useAuthContext();
const navigate = useNavigate();

const logout = async () =>{
    setError(null);
    setIsPending(true);

    try {

        const {uid} = eleveightAuth.currentUser;

        await eleveightDB.collection("users").doc(uid).update({
            onlineStatus: false
        });

        await eleveightAuth.signOut()

        dispatch({type:"LOGOUT"});

        window.location.reload(true)
        


        if (!isCancelled) {
            setIsPending(false);
            setError(null);
          }
        
    } catch (err) {
        if (isCancelled) {
            setIsPending(false);
            setError(err.message);
          }    
    }
};
useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return {logout, isPending, error};
}
