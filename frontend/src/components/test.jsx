
import './CalContent.css';
import Frame from './Frame.jsx';
import RatioList from './RatioList.jsx';
import {getAllRecipe,minManufacture} from '../services/Service.jsx'
import { useState,useEffect } from 'react';
import DetailsTable from './DetailsTable.jsx';

export default function CalContent(){
    const [recipes,setRecipe]=useState([]);
    const [selectedRecipes,setSelectedRecipes]=useState(5);
    const recipeName = recipes.find((item)=>Number(item.recipeId) ===Number(selectedRecipes));
    const [minManuf,setMinManuf]=useState(0);
    const [inputAmount,setInputAmount]=useState(100);
    //console.log({recipeName}?.recipeName)
    useEffect(()=> {
        const loadData = async()=>{
            
            const [data,min] = await Promise.all([getAllRecipe(),minManufacture(selectedRecipes)]);  // <= เรียก fn
            //setState
            setRecipe(data);
            setMinManuf(min);
        };
        loadData(); //<= เรียก fn loadData ที่เขียนไว้ด้านบน
    },[selectedRecipes]); 
    // console.log(selectedRecipes);
     //console.log(inputAmount);
    return(
        <div className="container">
            <div className="title-container">
                <h1 className='content-title'>คำนวณวัตถุดิบ</h1>
                <h4 className='content-description'>คำนวณสูตรอาหารจากวัตถุดิบที่มีในคลัง</h4>
            </div>   
            <div className="body-container">
                <div className="selectRecipe-container">
                    <p className='heading-title'>เลือกสูตร</p>
                    <select value={selectedRecipes} onChange={(e)=>setSelectedRecipes(e.target.value)}>
                         {recipes.map((recipe)=>( <option key={recipe.recipeId} value={recipe.recipeId}>สูตรที่ {recipe.recipeId} {recipe.recipeName}</option>))}
                    </select>
                    <p className='heading-title' >จำนวนการผลิต (กก.)</p>
                    <input placeholder='ระบุจำนวนการผลิต' type='number'value={inputAmount} onChange={(e) => {
                            const val = e.target.value;
                            if (val.length <= 5) {setInputAmount(val);}}}className='inputAmount' min={0}/>
                    <p className='heading-title'>อัตราส่วนผสม 100%</p>
                    <p className='underLine'></p> 
                    <RatioList recipeId={selectedRecipes} className="simple-list"/>
                </div>
                <div className='vertical-frame'>
                    <div className="result-frame">
                        <div className="result-content">
                            <p className='heading-title '>ผลการคำนวณ</p>
                            <p className='heading-title recipe-name'>{recipeName?.recipeName}</p>
                            <p className='verticle-line'></p>
                            <p className='heading-title manufacture-title'>ผลิตได้สูงสุด</p>
                            <p className='heading-title manufacture-amount'>{Number(minManuf).toFixed(0)} กก.</p>
                            <p className='verticle-line2'></p>
                            <p className='heading-title cost-title'>ต้นทุน</p>
                            <p className='heading-title cost-amount'>1000 บาท.</p>
                            {/* <p className='heading-title '>ถูกจำกัดโดย</p> */}
                            {/* <p className='heading-title '>ต้นทุน</p> */} 
                            {/* <button style={{width:150, height:40}}>สั่งผลิต</button> */}
                        </div>
                    </div>
                    <div className="details-table" >
                        <DetailsTable recipeId ={selectedRecipes} processAmount={inputAmount}/>
                    </div>
                </div>
            </div>
        </div>
        </div> 
    );        
}