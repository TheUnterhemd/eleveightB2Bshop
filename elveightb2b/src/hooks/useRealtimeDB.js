import { useEffect, useState } from "react"
import { eleveightDB } from "../firebase/config"



export const useRealtimeDB = (_collection,id) => {
const [item, setItem] = useState(null);
const [error,setError] = useState(null);

useEffect(() =>{
    const ref = eleveightDB.collection(_collection).doc(id);

    const unsub = ref.onSnapshot(snapshot => {
        if(snapshot.data()){
            setItem({...snapshot.data(), id: snapshot.id});
            setError(null);
        }
        else{
            setError("Item not found");
        }
        },
        (error) => {setError(error.message)});
    return () => unsub();
},[_collection,id]);



  return {item, error}
}
