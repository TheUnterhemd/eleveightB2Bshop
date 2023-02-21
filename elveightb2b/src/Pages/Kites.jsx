import './Kites.css'
import { useCollection } from '../hooks/useCollection'

export const Kites = () => {

  const {documents,error} = useCollection("Inventory")
  console.log(documents);
  return (
    <div>Kites</div>
  )
}
