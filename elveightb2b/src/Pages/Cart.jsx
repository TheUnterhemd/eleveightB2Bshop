import './Cart.css'
import { useState,useEffect } from 'react';

export const Cart = () => {
    const items = [];
    const[id,setId] =useState("")
    console.log(items);
    const del = (id) => {
        localStorage.removeItem(`Item ${id}`);
        items.splice(id,1);
        window.location.reload(true);
        console.log(items);
    }
    const readLocalStorage = () => {
    for (let i = 0; i < localStorage.length; i++) {
        const data = localStorage.getItem(`Item ${i}`);
        const item = JSON.parse(data)
        items.push(item)
    }}
    readLocalStorage()
    

  return (
    <div className='cart-box'>
        {items.map((item,i )=>(
            <div className="cart-card">
                <div className="image">
                    <h1>Item {i}</h1>
                </div>
                <div className="image">
                    <img src={item.imgURL} alt="Item-Pic" />
                </div>
                <div className="name">
                    <h2>{item.category}</h2>
                    <p>{item.item}</p>
                </div>
                <div className="color">
                    <h2>Color</h2>
                    <p>{item.color}</p>
                </div>
                <div className="size">
                    <h2>Size</h2>
                    <p>{item.size}</p>
                </div>
                <div className="quantity">
                    <h2>Quantity</h2>
                    <p>{item.quantity}</p>
                </div>
                <div className="buttons">
                    <button className='btn' value={i} onClick={()=>del(i)}>Delete</button>
                </div>
            </div>
        ))}
    </div>
  )
}
