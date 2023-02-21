import { useState } from "react";
import { AddItem } from "../components/AddItem";

import "./Backdoor.css"


export const Backdoor = () => {
  const [showAdd, setShowAdd] = useState(false);
  

  return (
    <div className="backdoor">
      <div className="sidebar">
        <button onClick={()=> setShowAdd(true)}>Add Item</button>
        <button>Delete Item</button>
        <button>Orders</button>
        <button>Users</button>
      </div>
      <div className="main-container">
        {showAdd && <AddItem />}

      </div>
    </div>
  )
}
