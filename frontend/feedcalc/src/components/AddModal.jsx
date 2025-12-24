import React,{ useState } from 'react'
import Select from "react-select";
import "./AddModal.css"

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

export default function AddModal({isOpen,onClose}) {
    console.log(isOpen)
     if (!isOpen) return null;
    const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div>
        <div className='modal-overlay' onClick={onClose}></div>
        <div className='modal-content-frame'>
            <div className='modal-content'>
                    <h4 className='title'>อัพเดทคลังวัตถุดิบ</h4>

                    <Select className="react-select-container"
                             classNamePrefix="react-select" 
                             options={options}/>

                    <div className='input-amount'>
                        <h5>ปริมาณ(กก.)</h5>
                        <input></input>
                    </div>
                    <div className='input-price'>
                        <h5>ราคา(บาท/กก.)</h5>
                        <input></input>
                    </div>
                    <div className='button-update'>
                        <button>update</button>
                    </div>
            </div>
        </div>
    </div>
        
        
    
  )
}
