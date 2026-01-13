
import './CalContent.css';
import Frame from './Frame.jsx';
import RatioList from './RatioList.jsx';
import {getAllRecipe,minManufacture,getTotalPrice} from '../services/Service.jsx'
import { useState,useEffect } from 'react';
import DetailsTable from './DetailsTable.jsx';

export default function CalContent(){
    const [recipes,setRecipe]=useState([]);
    const [selectedRecipes,setSelectedRecipes]=useState(5);
    const recipeName = recipes.find((item)=>Number(item.recipeId) ===Number(selectedRecipes));
    const [minManuf,setMinManuf]=useState(0);
    const [inputAmount,setInputAmount]=useState(100);
    const [totalPrice,setTotalPrice]=useState(0);
    //console.log({recipeName}?.recipeName)
    useEffect(()=> {
        const loadData = async()=>{
            
            const [data,min,totalPrice] = await Promise.all([getAllRecipe(),minManufacture(selectedRecipes),getTotalPrice(selectedRecipes,inputAmount)]);  // <= เรียก fn
            //setState
            setTotalPrice(totalPrice);
            setRecipe(data);
            setMinManuf(min);
        };
        loadData(); //<= เรียก fn loadData ที่เขียนไว้ด้านบน
    },[selectedRecipes][inputAmount]); 
    // console.log(selectedRecipes);
     //console.log(inputAmount);
    return(
        <div className="container">
            <div className="title-container">
                <div className='title-wrap'>
                    <h1 className='title-head'>คำนวณวัตถุดิบ (Calculate)</h1>
                    <h4 className='title-description'>คำนวณสูตรอาหารจากวัตถุดิบที่มีในคลัง</h4>
                </div>
            </div>   
            <div className="body-container">
                <div className="body-wrap">
                    <div className='selectRecipe-box'>
                        <p className="heading-title selectRecipe-title">เลือกสูตร</p>
                        <select className='selectRecipe-select' value={selectedRecipes} onChange={(e)=>setSelectedRecipes(e.target.value)}>
                            {recipes.map((recipe)=>( <option key={recipe.recipeId} value={recipe.recipeId}>สูตรที่ {recipe.recipeId} {recipe.recipeName}</option>))}
                        </select>
                        <p className="heading-title inputAmount-title">จำนวนการผลิต </p>
                        <div className='inputAmount-box'>
                            <input placeholder='ระบุจำนวนการผลิต' type='number' value={inputAmount} onChange={(e) => {
                                const val = e.target.value;
                                if (val.length <= 5) {setInputAmount(val);}}}className='inputAmount' min={0}/>
                            <button className='submitButton'>สั่งผลิต  
                        </button>
                        </div>
                    </div>
                    <div className="recipe-box">
                        <p className='heading-title'>อัตราส่วนผสม 100%</p>
                        <RatioList recipeId={selectedRecipes} className="simple-list"/>
                    </div>
                    <div className="result-box">
                        <p className='heading-title result-title'>ผลการคำนวณ</p> 
                        <p className='heading-title recipe-name'>{recipeName?.recipeName}</p>   
                        <p className='heading-title manufacture-title'>ผลิตได้สูงสุด</p>  
                        <div className='manufacture-box'>                        
                            <p className='heading-title manufacture-amount'>{Number(minManuf).toFixed(0).toLocaleString()}</p>   
                            <p className='heading-title manufacture-text'> กิโลกรัม</p>  
                        </div>
                        <p className='verticle-line2'></p>
                        <p className='heading-title cost-title'>ต้นทุนรวม</p>
                         <div className='cost-box'>  
                            <p className='heading-title cost-amount'>{Math.ceil(totalPrice?? 0).toLocaleString()}</p>
                            <p className='heading-title cost-text'> บาท</p>
                        </div>
                    </div>
                    <div className="details-box">
                        <DetailsTable recipeId ={selectedRecipes} processAmount={inputAmount}/>
                    </div>
                </div>
            </div>
        </div>
    );        
}