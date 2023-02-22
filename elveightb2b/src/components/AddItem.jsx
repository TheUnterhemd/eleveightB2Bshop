import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEleveightDB } from "../hooks/useEleveightDB";
import { eleveightStorage } from "../firebase/config";
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
  const [thumbnail,setThumbnail] = useState({});
  const [thumbnailError,setThumbnailError] = useState(null);
  


  const categories = [
    {value: "Kite", label: "Kite"},
    {value: "Board", label: "Board"},
    {value: "Foil", label: "Foil"},
    {value: "Wing", label: "Wing"},
    {value: "Bar", label: "Bar"},
    {value: "Accesoires", label: "Accesoires"}
  ]

  const handleFileChange = (e) => {
    /** A clean up to the input type file so it will only take the last file we upload */
    setThumbnail(null);

    let selected = e.target.files[0];

    console.log(selected);
    if (!selected) {
      setThumbnailError("Please select an image file");
      return;
    }
    /** To check if the file uploaded is an Image or not */
    if (!selected.type.includes("image")) {
      setThumbnailError("The File must be an image");
      return;
    }
    /** To check to file size */
    if (selected.size > 2000000) {
      setThumbnailError("Image file must be less than 100kb");
      return;
    }
    setThumbnailError(null);
    setThumbnail(selected);
    console.log("thumbnail updated");
  };



  const handleSubmit = async (e) =>{
    e.preventDefault()
    setFormError(null);
    if (!category) {
        setFormError("Please select a project category");
        return;
      }

      const uploadPath = `Pics/${thumbnail.name}`;

      const img = await eleveightStorage.ref(uploadPath).put(thumbnail);
      const imgURL = await img.ref.getDownloadURL();


    const createdBy ={
      user: user.displayName,
      id: user.uid,
    };
    const item={
      category: category.value,
      imgURL: imgURL,
      itemName,
      itemSize,
      itemColor,
      itemQuantity,
      createdBy
    }
    await addItem(item,thumbnail);
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
    <label>
          <span>Pictures:</span>
          <input type="file" required onChange={handleFileChange} multiple/>
          {/** A box will disply the Thumbnail error */}
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
    <button >Add Item</button>
  </form></div>
  )
}
