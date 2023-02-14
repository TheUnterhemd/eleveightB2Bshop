import { useEffect,useState,useReducer } from "react"
import { eleveightDB } from "../firebase/config"

let initialState = {
    item: null,
    isPending: false,
    error: null,
    success: null
}

const eleveightDBReducer = (state, action) =>{
switch(action.type){
    case "IS_PENDING":
        return {isPending: true, item:null,success:false,error:null };
    case "ADDED_ITEM":
        return {isPending: false, item:action.payload, success:true, error:null};
    case "DELETED_ITEM":
        return {isPending: false, item:null, success:true, error:null};
    case "UPDATED_ITEM":
        return {isPending: false, item:action.payload, success:true, error:null};
    case "ERROR":
        return {isPending: false, item:null, success:false, error:action.payload};
    default: return state;}
};


export const useEleveightDB = (_collection) => {
    const [response, dispatch] = useReducer(eleveightDBReducer,initialState);
    const [isCancelled,setIsCancelled] = useState(false)

    const ref = eleveightDB.collection(_collection);

    const dispatchIfnotCancelled = (action) =>{
        if(!isCancelled){
            dispatch(action);
        }
    };

    const addItem = async (doc) =>{
        dispatch({type: isPending});
        try {
            const addDocument = await ref.add({...doc});

            dispatchIfnotCancelled({
                type: "ADD_ITEM",
                payload: addDocument,})      
        } 
        catch (error) {
            dispatchIfnotCancelled({
                type: "ERROR",
                payload: error.message,})  
        }
    }

    const deleteItem = async (id) =>{
        dispatch({type: isPending});
        try {
            await ref.delete(id);
            dispatchIfnotCancelled({
                type: "DELETED_ITEM",})
        } catch (error) {
            dispatchIfnotCancelled({
                type: "ERROR",
                payload: error.message,})
        };
    };

    const updateItem = async (id, update) =>{
        dispatch({type: isPending});
        try {
           const updatedItem = await ref.doc(id).update(update);
            dispatchIfnotCancelled({
                type: "UPDATED_ITEM",
                payload: updatedItem,})            
        } catch (error) {
            dispatchIfnotCancelled({
                type: "ERROR",
                payload: error.message,})            
        };
    };

    useEffect(()=>{
        return () => setIsCancelled(true);
    },[]);

  return {addItem, deleteItem, updateItem, response}
}
