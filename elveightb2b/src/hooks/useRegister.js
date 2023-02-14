import { useState,useEffect } from "react"
import { eleveightAuth, eleveightDB, eleveightStorage } from "../firebase/config"
import {useAuthContext} from './useAuthContext'

export  function useRegister() {
  const[isCancelled, setIsCancelled] = useState(false);
  const[error, setError] = useState(null);
  const[isPending, setIsPending] = useState(false);
  const {dispatch} = useAuthContext();


  const register = async (email,password,displayName,thumbnail,company,taxNumber,region) =>{
    setError(null);
    setIsPending(true);

    try {
        const resultAuth = await eleveightAuth.createUserWithEmailAndPassword(email, password );

        if(!resultAuth){
            throw new Error("could not create user");
        }
        const uploadPath = `logos/${resultAuth.user.uid}/logo`;

        const img = await eleveightStorage.ref(uploadPath).put(thumbnail);
        const imgURL = await img.ref.getDownloadURL();

        await resultAuth.user.updateProfile({displayName, logoURL: imgURL});

        await eleveightDB.collection('users').doc(resultAuth.user.uid).set({
            onlineStatus: true,
            displayName,
            company,
            taxNumber,
            region,
            photoUrl: imgURL,
        })

        dispatch({type: "LOGIN", payload: resultAuth.user});

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

  }
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return {register,error,isPending}
}
