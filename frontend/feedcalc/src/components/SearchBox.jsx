import React from 'react'
import "./SearchBox.css"

export default function SearchBox() {
  return (
    <div className='search-box'>
        <input type="text" maxLength={30} placeholder="ค้นหา...(รหัส,ชื่อ)"  onChange={""}/>
    </div>
  )
}
