import './Style.css'
import { useCollection } from '../hooks/useCollection'
import { Link } from 'react-router-dom';

export const Accesoires = () => {

  const {documents,error} = useCollection("Inventory",["category", "==", "Accesoires"])
  
  
  const filtered = documents?.reduce((acc,document)=>{
    const exist = acc.find(item => item.itemName === document.itemName)
    if(!exist){
      acc.push({itemName: document.itemName, imgURL: document.imgURL})
    }
    return acc
  },[])
  
  
  
  return (
    <div className='accesoires'>
      <div className="header">
        <h1>Time to be Cool</h1>
      </div>
      <div className="item-box">
      {filtered?.map((item,index)=>(
        <Link to={`/accesoires/${item.itemName}/*`} key={index}>
        <div className="card">
          <img src={item.imgURL} alt="" />
          <h3>{item.itemName}</h3>
        </div></Link>
      ))}</div>
    </div>
  )
}
