import { AuthContext } from "../context/authContext";
import { useContext} from "react";

export function useAuthContext() {
const context = useContext(AuthContext);

  if(!context){
    throw new Error("useAuthContext must be used inside an AuthContextProvider tag")
  }
  return context;
}
