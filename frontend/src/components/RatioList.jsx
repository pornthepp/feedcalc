import { useState,useEffect } from 'react';
import "./RatioList.css"
import { getRatioByRecipeId } from '../services/Service';

export default function SimpleList(props) {
  const [ratio,setRatio]=useState([]);
  const {recipeId, title} = props;
  useEffect(()=>{
      const loadData = async()=>{
      const data = await getRatioByRecipeId(props.recipeId);  // <= เรียก fn
      //setState
      setRatio(data);
      };
      loadData();
  },[props.recipeId]);
  return (
    <div className="simple-list">
      {/* <h1 className='title'>{props.title}</h1> */}
      <ul className='list'>
        {ratio.map((item) => 
            <li key={item.ratioId}>
              <span className="mat-name">{item.materialName}</span>
             <span className="mat-amount">{item.amount} %</span>
            </li>
        )}
      </ul>
    </div>
  );
}
