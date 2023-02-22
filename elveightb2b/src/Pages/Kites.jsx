import './Kites.css'
import { useCollection } from '../hooks/useCollection'
import { Link } from 'react-router-dom';

export const Kites = () => {

  const {documents,error} = useCollection("Inventory",["category", "==", "Kite"])
  
  
  const filtered = documents?.reduce((acc,document)=>{
    const exist = acc.find(item => item.itemName === document.itemName)
    if(!exist){
      acc.push({itemName: document.itemName, imgURL: document.imgURL})
    }
    return acc
  },[])
  
  
  
  return (
    <div className='kites'>

      {filtered?.map((item,index)=>(
        <Link to={`/kites/${item.itemName}/*`} key={index}>
        <div className="card">
          <img src={item.imgURL} alt="" />
          <h3>{item.itemName}</h3>
        </div></Link>
      ))}
    </div>
  )
}
