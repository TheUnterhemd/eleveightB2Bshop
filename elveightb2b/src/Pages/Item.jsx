import "./Item.css"
import { Routes,Route, useParams } from "react-router-dom"
import { useCollection } from "../hooks/useCollection";
import { useEffect, useState } from "react";

export const Item = () => {
const { name } = useParams();
const {documents,error} = useCollection("Inventory",["itemName", "==", `${name}`])

const [color,setColor] = useState("");
const [usedPic, setUsedPic] = useState("")
const [size, setSize] = useState(0);

const filteredColor = documents?.reduce((acc,document)=>{
    const exist = acc.find(item => item.itemColor === document.itemColor)
    if(!exist){
      acc.push({itemColor: document.itemColor, imgURL: document.imgURL})
    }
    return acc
  },[])

  useEffect(() => {
    const used = filteredColor?.filter(item => item.itemColor === color);
    setTimeout(() =>{
        setUsedPic(used[0].imgURL);
    })
  },[color])

    

  return (
    <div className="selected-item">
        {documents && (
            <>
            <div className="colorPic">
                {filteredColor.map((color,index) =>(
                    <div key={index}>
                        <img src={color.imgURL} alt={color.itemColor} width="100" onClick={(e)=>setColor(e.target.alt)}/>
                    </div>

                ))}
            </div>
            <div className="selected">
            <h1>{documents[0].itemName}</h1>
            <img src={!color?documents[0].imgURL:usedPic} alt="" width="300px"/>

            </div>
            </>
        )}

    </div>
  )
}
