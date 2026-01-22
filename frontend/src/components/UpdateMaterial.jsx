import React ,{useState} from 'react'
import "./updateMaterial.css"
import UpdateModal from './UpdateModal.jsx';



export default function UpdateMaterial({doRefresh}) {
  const [showModal,setShowModal] = useState(false)
  return (
    <div className='update-material'>
        <button className="img-button" onClick={() =>setShowModal(true)}>
          <span className="tooltip">แก้ไขสต็อก</span>
        </button>
        <UpdateModal isOpen ={showModal} onClose={()=>setShowModal(false)} doRefresh={doRefresh} />

    </div>

  )
}
