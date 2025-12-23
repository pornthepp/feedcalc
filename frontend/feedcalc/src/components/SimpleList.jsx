import React from 'react'
import "./SimpleList.css"

export default function SimpleList(props) {
  const {id,name,value} = props;
  const list = [
    {id:1001,name: "ข้าวโพด",value: 20},

  ];
  return (
    <div className="simple-list">
      <h1 className='title'>{props.title}</h1>
      <ul className='list'>
        {list.map((list) => 
            <li key={list.id}>{ list.name } {"    "}{list.value}</li>
        )}
      </ul>
    </div>
  );
}
