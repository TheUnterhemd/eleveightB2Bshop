import { useState } from "react";
import { AddItem } from "../components/AddItem";

import "./Backdoor.css"


export const Backdoor = () => {
  const [showAdd, setShowAdd] = useState(false);
  

  return (
    <div className="backdoor">
      <div className="sidebar">
        <button className="btn" onClick={()=> setShowAdd(true)}>Add Item</button>
        <button className="btn">Delete Item</button>
        <button className="btn">Orders</button>
        <button className="btn">Users</button>
      </div>
      <div className="main-container">
        {showAdd && <AddItem />}

      </div>
    </div>
  )
}
