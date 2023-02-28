import "./Item.css"
import { useParams } from "react-router-dom"
import { useCollection } from "../hooks/useCollection";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const Item = () => {
const { name } = useParams();
const {documents,error} = useCollection("Inventory",["itemName", "==", `${name}`])

let count = localStorage.length;

const [color,setColor] = useState("");
const [usedPic, setUsedPic] = useState("")
const [size, setSize] = useState(0);
const [quantity, setQuantity] = useState(1);
const {setCart} = useAuthContext();

useEffect(() => {setCart(count);},[count])


//filter colors
const filteredColor = documents?.reduce((acc,document)=>{
    const exist = acc.find(item => item.itemColor === document.itemColor)
    if(!exist){
      acc.push({itemColor: document.itemColor, imgURL: document.imgURL,})
    }
    return acc
  },[])
//use right picture for color
  useEffect(() => {
    const used = filteredColor?.filter(item => item.itemColor === color);
    setTimeout(() =>{
        setUsedPic(used[0].imgURL);
    })
  },[color])

  //find all of one color
  const allOfColor = documents?.filter(doc => doc.itemColor === color);

  //handle order an push it into localStorage
  const handleOrder = (e) =>{
    e.preventDefault()
    const key =`Item ${localStorage.length}`;
    const order = {
      item: allOfColor[0].itemName,
      imgURL: allOfColor[0].imgURL,
      size,
      quantity,
      color,
      category: allOfColor[0].category
    }
    localStorage.setItem(key, JSON.stringify(order));
    count++;
    setCart(count);
    console.log(count);
  }

  return (
    <div className="item">
      <div className="header">
        <h1>{name}</h1>
      </div>
    <div className="selected-item">
        {documents && (
            <>
            <div className="pics">
              
            <div className="colorPic">
                {filteredColor.map((color,index) =>(
                    <div key={index}>
                        <img src={color.imgURL} alt={color.itemColor} width="100" onClick={(e)=>setColor(e.target.alt)}/>
                    </div>

                ))}
            </div>

            <div className="selected">
            <img src={!color?documents[0].imgURL:usedPic} alt="" width="300px"/>
            </div></div>

            <div className="size">
              <p>available Sizes</p>
              <h2>
              {allOfColor.map((item,i )=> (<span key={i}>{item.itemSize}/</span>))}
              </h2>
            </div>

            <form onSubmit={handleOrder} className="order-form">
            <label className="box">
              <span>Choose your Size:</span>
              <select name="Size" id="Size" onChange={(e)=>setSize(e.target.value)}>
                <option value="-">----</option>
              {allOfColor.map((item,i )=> (<option key={i} value={item.itemSize}>{item.itemSize}</option>))}
              </select></label>

              <label className="box"><span>Pieces:</span>
              <input type="number" name="quantity" id="quantity" onChange={(e)=>setQuantity(e.target.value)} value={quantity}/></label>
              <button className="btn">Add to Cart</button>

            </form>
            </>

        )}

    </div>
    </div>
  )
}
