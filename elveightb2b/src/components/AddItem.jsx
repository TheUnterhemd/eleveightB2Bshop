import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEleveightDB } from "../hooks/useEleveightDB";
import Select from "react-select";

export const AddItem = () => {
    const {addItem, response} = useEleveightDB("Inventory");
  const [formError,setFormError] = useState(null);
  const {user} = useAuthContext();
  const navigate = useNavigate();

  const [category, setCategory] = useState("")
  const [itemName,setItemName] = useState("");
  const [itemSize,setItemSize] = useState(0);
  const [itemColor,setItemColor] = useState("");
  const [itemQuantity,setItemQuantity] = useState(0);
  


  const categories = [
    {value: "Kite", label: "Kite"},
    {value: "Board", label: "Board"},
    {value: "Foil", label: "Foil"},
    {value: "Wing", label: "Wing"},
    {value: "Bar", label: "Bar"},
    {value: "Accesoires", label: "Accesoires"}
  ]



  const handleSubmit = async (e) =>{
    e.preventDefault()
    setFormError(null);
    if (!category) {
        setFormError("Please select a project category");
        return;
      }

     


    const createdBy ={
      user: user.displayName,
      id: user.uid,
    };
    const item={
      category: category.value,
      itemName,
      itemSize,
      itemColor,
      itemQuantity,
      createdBy
    }
    await addItem(item);
    if(!response.error){
      navigate("/")
    }
 }
  return (
    <div><form onSubmit={handleSubmit}>
        <label>
          <span>Category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
    <label>
      <span>Item Name:</span>
      <input type="text" name="name" id="name" value={itemName} onChange={(e)=>setItemName(e.target.value)}/>
    </label>
    <label>
      <span>Item Size:</span>
      <input type="number" name="size" id="size" value={itemSize} onChange={(e)=>setItemSize(e.target.value)}/>
    </label>
    <label>
      <span>Item Color:</span>
      <input type="text" name="color" id="color" value={itemColor} onChange={(e)=>setItemColor(e.target.value)}/>
    </label>
    <label>
      <span>Item Quantity:</span>
      <input type="number" name="quantity" id="quantity" value={itemQuantity} onChange={(e)=>setItemQuantity(e.target.value)} />
    </label>
    <button >Add Item</button>
  </form></div>
  )
}
