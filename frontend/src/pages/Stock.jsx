import React, { useEffect,useState } from "react"
import Header from "../components/Header"
import StockTable from "../components/StockTable"
import UniversalButton from "../components/UniversalButton.jsx"
import UniversalModal from "../components/UniversalModal.jsx";
import Select from "react-select";
import {getAllMaterial,updateMaterialStock,getMaterialById,updateMaterialPrice} from "../services/Service.jsx"

import "./Stock.css"
import { Await } from "react-router";



export default function Stock() {
    const [refresh,setRefresh] = useState(false);
    const [selectMaterial ,setSelectMaterial] = useState([]);
    const [materials,setMaterials]=useState([]);
    const [leftMaterial,setLeftMaterial]=useState();
    const [priceNow,setPriceNow]=useState();     
    const [addStockValue,setAddStockValue]=useState(0);
    const [updateStockValue,setUpdateStockValue] = useState(0);
    const [updatePriceValue,setUpdatePriceValue] = useState(0);
    const [shaker,setShaker]=useState(false);
    //modal
    const [isOpen,setIsOpen] = useState(false);
    const [modalType,setModalType] = useState("");
    //modal-confirm
    
    const openAddModal = ()=>{
        setModalType("add");
        setIsOpen(true);
    }
    const openEditModal= ()=>{
        setModalType("edit");
        setIsOpen(true);
    }

    const handleCancel = ()=>{
        setIsOpen(false)
    }
    const handleConfirm = ()=>{
        console.log(isOpen);
        
    }
    //SUM Material Amount
    const calAdd=()=>{
        const cal = Number(leftMaterial)+Number(addStockValue);
        return(cal);
    }
    const selectChange = (selectedOption) => {
        setSelectMaterial({id:selectedOption.value,
                        name:selectedOption.label});   
    }    

    useEffect(() => {
    const loadData = async () => {
        try {
            const data = await getAllMaterial();
            setMaterials(data);
            //check ว่ามีการเลือก material รึยัง
            if (selectMaterial?.id) {
                const left = await getMaterialById(selectMaterial.id);
                setLeftMaterial(left.materialStock);
                setPriceNow(left.materialPrice);
            } else {
                setLeftMaterial(0);
                setPriceNow(0);
            }
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };
    loadData();
    // console.log(updateStockValue);
    // console.log(updatePriceValue);
    

}, [selectMaterial,updateStockValue,updatePriceValue]); // ทำงานใหม่ทุกครั้งที่ค่าใน Select เปลี่ยน

    const handleRefresh=()=>{
        if(refresh===false){
            setRefresh(true);
        }else{
            setRefresh(false);
        }
    }
    
    const addMaterialStock = async()=>{
        //เช็คว่าเลือกวัตถุดิบรึยัง
        if(!selectMaterial?.id){
            setShaker(true);
            setTimeout(() => {setShaker(false);}, 500);
            return;
        }
        const isStock = Number(addStockValue) > 0;
        try{
            if(isStock){
                 await  updateMaterialStock(selectMaterial.id,calAdd())
                 console.warn(`Add Stock - ID: ${selectMaterial.id} Stock: ${addStockValue}`);
            }else{
                setShaker(true);
                setTimeout(() => {setShaker(false);}, 500);
                return;
            }finishUpdate();
        }catch (error) {
            console.error("Update failed:", error);
        }}
    
    const finishUpdate = ()=>{
        setIsOpen(false);
        handleRefresh();
        setUpdateStockValue(0); 
        setUpdatePriceValue(0);      // ล้างค่าจำนวนที่กรอก
        setSelectMaterial(0);  
    }

    const updateMaterial = async()=>{
        //เช็คว่าเลือกวัตถุดิบรึยัง
        if(!selectMaterial?.id){
            setShaker(true);
            setTimeout(() => {setShaker(false);}, 500);
            return;
        }
        const isStock = Number(updateStockValue) > 0;
        const isPrice = Number(updatePriceValue) > 0;
        try{
            // กรณีกรอกทั้งคู่
            if(isStock && isPrice){
                await Promise.all([
                    updateMaterialStock(selectMaterial.id,updateStockValue),
                    updateMaterialPrice(selectMaterial.id,updatePriceValue)
                ]);
                console.warn(`Updated All - ID: ${selectMaterial.id} Stock: ${updateStockValue} Price: ${updatePriceValue}`);
            // กรณีกรอกแค่จำนวณ
            }else if (isStock) {
                await updateMaterialStock(selectMaterial.id,updateStockValue);
                console.warn(`Updated Stock - ID: ${selectMaterial.id} Stock: ${updateStockValue}`);
            // กรณีกรอกแค่ราคา 
            }else if (isPrice){
                await updateMaterialPrice(selectMaterial.id,updatePriceValue); 
                console.warn(`Updated Price - ID: ${selectMaterial.id} Price: ${updatePriceValue}`);
            }else{
                setShaker(true);
                setTimeout(() => {setShaker(false);}, 500);
                return;
            }finishUpdate();
        }catch (error) {
            console.error("Update failed:", error);
        }
    }
    
    
        // updateValue?updateMaterialStock(updateId,updateValue):
        // updateMaterialPrice(updateId,updatePrice),closePopup(false),setShowMessage(true)
  return (
    <div>
        <Header page="stock"/>
        <div className="stock-body-container">
            <div className="stock-body-wrap">
                <div className="stock-header-bar">
                    <UniversalButton onClick={openAddModal} type={"cancel"} buttonLabel={"เติมวัตถุดิบ"}/>
                    <UniversalButton onClick={openEditModal} type={"cancel"}buttonLabel={"แก้ไขวัตถุดิบ"}/>
                </div>

                {/*Modal*/ }
                
    
                <UniversalModal shaker ={shaker} onCancel={handleCancel} onConfirm={modalType === "add" ? addMaterialStock : updateMaterial} 
                    isOpen={isOpen} onClose ={() => setIsOpen(false)} 
                    title={modalType === "add"?"เติมวัตถุดิบ":"แก้ไขวัตถุดิบ"} refresh={setRefresh}>
                    {/*Add*/ }
                    {modalType==="add"&&
                    <div className="react-select-container">
                        <div>
                            <Select placeholder = "เลือกวัตถุดิบ"
                                onChange={selectChange}
                                className="material-select-box"
                                classNamePrefix="material-select" 
                                menuPortalTarget={document.body} 
                                styles={{ menuPortal: base => ({ ...base, zIndex: 99999 }) }}
                                options={materials.map((item,index)=>({value:item.materialId,label:item.materialName}))}/>
                            <div className="add-material-content">
                                <p className="add-material-title">ปริมาณ(กก.) </p>
                                <input className="add-material-input" type="number" placeholder={`คงเหลือ ${leftMaterial ?? 0}`} min={0} onChange={(e)=>{
                                    const val = e.target.value;
                                    setAddStockValue(val.replace(/^0+/, ""))}}>
                                </input>
                            </div>
                            <p style={{fontSize:"14px" ,color:"gray"}}>*หากกดยืนยัน ระบบจะทำการอัพเดทสต๊อกอัตโนมัติ*</p>
                        </div>
                    </div>}
                    {modalType==="edit" && 
                    <div className="react-select-container">
                        <div>
                            <Select placeholder = "เลือกวัตถุดิบ"
                                onChange={selectChange}
                                className="material-select-box"
                                classNamePrefix="material-select" 
                                menuPortalTarget={document.body} 
                                styles={{ menuPortal: base => ({ ...base, zIndex: 99999 }) }}
                                options={materials.map((item,index)=>({value:item.materialId,label:item.materialName}))}/>
                            <div className="update-material-content">
                                <div className="update-material-content-wrap">
                                    <div className="update-material-input-box">
                                        <p className="update-material-title">ปริมาณ(กก.) </p>
                                        <input className="update-material-input" type="number" placeholder={`คงเหลือ ${leftMaterial ?? 0} กก.`} min={0} onChange={(e)=>{
                                        const val = e.target.value; setUpdateStockValue(val.replace(/^0+/, ""))}}>
                                    </input>
                                    </div>
                                    <div className="update-material-input-box">
                                        <p className="update-material-title">ราคา(บาท/กก.) </p>
                                        <input className="update-material-input" type="number" placeholder={`ปัจจุบัน ${priceNow ?? 0} บาท`} min={0} 
                                        onChange={(e)=>{
                                            const val = e.target.value; setUpdatePriceValue(val.replace(/^0+/, ""))}}>
                                        </input>
                                    </div>
                                </div>
                               
                                
                                <p style={{fontSize:"14px" ,color:"gray"}}>*หากกดยืนยัน ระบบจะทำการอัพเดทสต๊อกอัตโนมัติ*</p>
                            </div>
                        </div>
                    </div>}
                </UniversalModal>

                
                <div className="stock-table-wrap">
                    <StockTable doRefresh={refresh}/>
                </div>
            </div>
        </div>
  </div>

  )
}
