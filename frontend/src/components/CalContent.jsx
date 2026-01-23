import "./CalContent.css";
import Frame from "./Frame.jsx";
import RatioList from "./RatioList.jsx";
import {getAllRecipe,minManufacture,getTotalPrice, getAllMaterial,getCalRatio,handleManufacture} from "../services/Service.jsx"
import { useState,useEffect, cache } from "react";
import DetailsTable from "./DetailsTable.jsx";
import UniversalButton from "./UniversalButton.jsx";
import UniversalModal from "./UniversalModal.jsx";
import LoadingScreen from "./LoadingScreen.jsx";


export default function CalContent(){
    const [recipes,setRecipe]=useState([]);
    const [selectedRecipes,setSelectedRecipes]=useState(5);
    const recipeName = recipes?.find((item) => Number(item.recipeId) === Number(selectedRecipes));
    const [minManuf,setMinManuf]=useState(0);
    const [inputAmount,setInputAmount]=useState(100);
    const [totalPrice,setTotalPrice]=useState(0);
    const [useMaterials,setUseMaterials]=useState([]);
    const [showSuccessMessage,setShowSuccessMessage] = useState(false);
    const [showErrorMessage,setShowErrorMessage] = useState(false);
    const [shaker,setShaker]=useState(false);   
    //modal
    const [isOpen,setIsOpen] = useState(false);
    const [modalType,setModalType] = useState("");
    const [loading,setLoading]= useState(true);

    //modal-confirm
    const openConfirm = ()=>{
        setModalType("CONFIRM");
        setIsOpen(true);
    }
    const handleCancel=()=>{
        setIsOpen(false);
    }

    //load-dataForLog
    const[manufLog,setManufLog]=useState([])
    useEffect(()=>{
        const loadData = async()=>{
            try{
                const data = await getCalRatio(selectedRecipes,inputAmount);
                if(data && data.length > 0){
                    const logdata = data.map(item =>({
                        materialId:item.materialId,
                        materialName:item.materialName,
                        materialUse:item.materialUse,
                        materialStock:item.materialStock
                    }));
                    setLoading(false);
                    setManufLog(logdata);
                }else{
                    console.warn("ยังไม่มีข้อมูล หรือเชื่อมต่อไม่ได้");
                }
            }catch (error){
                console.log("error loadData");
                setManufLog([]);
            }
        }
        loadData();
    },[inputAmount,selectedRecipes]
    )

    //console.log({recipeName}?.recipeName)
    useEffect(()=> {
        const loadData = async()=>{
            try{
                const [data,min,totalPrice,materials] = await Promise.all([getAllRecipe(),minManufacture(selectedRecipes),getTotalPrice(selectedRecipes,inputAmount),getAllMaterial()]);  // <= เรียก fn
                //setState
                setTotalPrice(totalPrice);
                setRecipe(data);
                setMinManuf(min);
            }catch (error){
                console.log("error loadData");
                setTotalPrice(0);
                setRecipe([]);
                setMinManuf(0);
            }
        };
        loadData(); 
    },[selectedRecipes,inputAmount]); 

    //ผลิตและอัพเดทไปยัง log
    const processProductionWithLogs = async()=>{
        if(Number(inputAmount) ===0){
            console.warn("input amount is null");
            setShaker(true);
            setTimeout(() => {setShaker(false);}, 500);
            return;
        }else if (Number(inputAmount) > Number(minManuf)){
            console.warn("material not enought");
            setShaker(true);
            setTimeout(() => {setShaker(false);}, 500);
            return;
        }
        else{
            await handleManufacture(manufLog,inputAmount,recipeName);
            //console.warn(recipeName.recipeName);
            //console.warn(manufLog);
            console.warn("Saved to log");
            setInputAmount(0);
            setIsOpen(false);
        }
    }
    return(
        <div className="container">
            <LoadingScreen isLoading={loading}/>
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
                                if (val.length <= 5) {setInputAmount(val)}}}className='inputAmount' min={0}/>
                                
                            <UniversalButton onClick={openConfirm} type={"confirm"}buttonLabel={"ผลิต"}/>
                            <UniversalModal shaker ={shaker}  onCancel={handleCancel} onConfirm={processProductionWithLogs} isOpen={isOpen} onClose ={() => setIsOpen(false)} title={modalType === "CONFIRM" ? "ตรวจสอบข้อมูล" :""}>
                                <div>
                                    <div className="my-custom-content">
                                        <p>ผลิต: {recipeName?.recipeName}</p>
                                        <p>จำนวณ: {inputAmount} กิโลกรัม</p>
                                        <p style={{fontSize:"14px" ,color:"gray"}}>*หากกดยืนยัน ระบบจะทำการอัพเดทสต๊อกอัตโนมัติ*</p>
                                    </div>
                                </div>
                            </UniversalModal>
                            
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
                        <DetailsTable doRefresh = {isOpen} recipeId ={selectedRecipes} processAmount={inputAmount}/>
                    </div>
                </div>
            </div>
        </div>
    );        
}