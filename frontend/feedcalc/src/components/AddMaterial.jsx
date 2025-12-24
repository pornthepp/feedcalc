import React ,{useState} from 'react'
import { MdAddBox } from "react-icons/md";
import "./AddMaterial.css"
import AddModal from './AddModal.jsx';



export default function AddMaterial() {
  const [showModal,setShowModal] = useState(false)
  console.log("isOpen:", showModal)
  return (
    <div className='add-material'>
        <button className="img-button" onClick={() =>setShowModal(true)} >
            <MdAddBox/>
        </button>
        <AddModal isOpen ={showModal} onClose={()=>setShowModal(false)} />

    </div>

  )
}
