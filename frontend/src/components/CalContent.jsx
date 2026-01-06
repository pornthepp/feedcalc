
import './CalContent.css';
import Frame from './Frame.jsx';
import RatioList from './RatioList.jsx';
import {getAllRecipe ,getCalRatio} from '../services/Service.jsx'
import { useState,useEffect } from 'react';
import DetailsTable from './UsingMaterialDetails.jsx';

export default function CalContent(){
    const [recipes,setRecipe]=useState([]);
    const [selectedRecipes,setSelectedRecipes]=useState(5);
    const [inputAmount,setInputAmount]=useState(100);
    useEffect(()=> {
        const loadData = async()=>{
            const data = await getAllRecipe();  // <= เรียก fn
            //setState
            setRecipe(data);
        };
        loadData(); //<= เรียก fn loadData ที่เขียนไว้ด้านบน
    },[]); // ถ้าพังให้ส่ง array ว่างไปให้ option 

    return(
        <div className="content">
            <div className="title-container">
                <h1 className='content-title'>คำนวณวัตถุดิบ</h1>
                <h4 className='content-description'>คำนวณสูตรอาหารจากวัตถุดิบที่มีในคลัง</h4>
            </div>    
            <div className="flex-container">
                <Frame className="select-frame">
                    <p className='title'>เลือกสูตร</p>
                    <select value={selectedRecipes} onChange={(e)=>setSelectedRecipes(e.target.value)}>
                         {recipes.map((recipe)=>( <option key={recipe.recipeId} value={recipe.recipeId}>สูตรที่ {recipe.recipeId} {recipe.recipeName}</option>))}
                    </select>
                    <p className='title'>จำนวณการผลิต (กก.)</p>
                    
                    <input defaultValue={inputAmount} className='inputAmount' type='number'></input>
                    <p className='title'>อัตราส่วนผสม 100%</p>
                    <p className='underLine'></p> 
                    <RatioList recipeId={selectedRecipes} className="simple-list"/>
                </Frame>
                <div className='vertical-frame'>
                    <Frame className="result-frame">
                        <p className='title result1'>ผลการคำนวณ</p>
                        {/* <button style={{width:150, height:40}}>สั่งผลิต</button> */}
                    </Frame>
                    <Frame className="details-frame">
                        <p className='title'>รายละเอียดการใช้วัตถุดิบ</p>
                        <DetailsTable/>
                    </Frame>
                </div>
            </div>
        </div>
    );        
}