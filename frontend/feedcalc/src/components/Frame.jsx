import React from 'react'
import './Frame.css'

export default function Frame(props) {
  //ให้ component Frame สามารถเพิ่ม class name ได้มากกว่า frame 
  const combinedClasses = `frame ${props.className || ''}`;
  //-----------------------frame เอาตัวแปรมาแปะใน string ถ้าไม่ได้ ชื่อ class มาให้ส่งคืน ''

  return (
    <div className={combinedClasses}>
        {props.children}
    </div>

  )
}
