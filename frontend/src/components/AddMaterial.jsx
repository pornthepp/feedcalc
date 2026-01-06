import React ,{useState} from 'react'
import "./AddMaterial.css"
import AddModal from './AddModal.jsx';



export default function AddMaterial() {
  const [showModal,setShowModal] = useState(false)
  return (
    <div className='add-material'>
        <button className="img-button" onClick={() =>setShowModal(true)}>
          <span className="tooltip">อัพเดทสต็อก</span>
        </button>
        <AddModal isOpen ={showModal} onClose={()=>setShowModal(false)} />

    </div>

  )
}
