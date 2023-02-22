import './Foils.css'
import { useCollection } from '../hooks/useCollection'
import { Link } from 'react-router-dom';

export const Foils = () => {

  const {documents,error} = useCollection("Inventory",["category", "==", "Foil"])
  
  
  const filtered = documents?.reduce((acc,document)=>{
    const exist = acc.find(item => item.itemName === document.itemName)
    if(!exist){
      acc.push({itemName: document.itemName, imgURL: document.imgURL})
    }
    return acc
  },[])
  
  
  
  return (
    <div className='foils'>

      {filtered?.map((item,index)=>(
        <Link to={`/foils/${item.itemName}/*`} key={index}>
        <div className="card">
          <img src={item.imgURL} alt="" />
          <h3>{item.itemName}</h3>
        </div></Link>
      ))}
    </div>
  )
}