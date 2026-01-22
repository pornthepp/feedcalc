// Service.js
import axios from "axios";
import { useState,useEffect } from "react";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
});

const handleApiError = (error) => {
  if (error.message === "Network Error") {
    console.warn("ไม่สามารถติดต่อฐานข้อมูลได้");
  } else {
    console.error(error.message);
  }
};



export const getAllRecipe = async () => {
  try {
    const response = await axios.get("http://localhost:8080/recipes");
    return response.data;
  }catch (error)  {
    handleApiError(error)
    return [];
  }
}

export const getAllMaterial = async () => {
  try {
    const response = await axios.get("http://localhost:8080/materials");
    return response.data;
  } catch (error)  {
    handleApiError(error)
    return [];
  }
}

export const getMaterialById = async (id) => {
  try {
    if (id){
      const response = await axios.get(`http://localhost:8080/materials/${id}`);
      return response.data;
    }
  }catch (error)  {
    handleApiError(error)
    return [];
  }
}

//ดึง ratio ด้วย id 
export const getRatioByRecipeId = async (id) => {
    // ถ้าไม่มี id ให้ return ค่าว่าง
    if (!id || id === "") return []; 
    try {
        const response = await axios.get(`http://localhost:8080/ratios/byRecipeId/${id}`);
        return response.data;
    }catch (error)  {
      handleApiError(error)
      return [];
    }
}
//ดึงจำนวนที่ผลิตได้เต็มที่ จาก recipeId
export const minManufacture = async (recipeId) => {
    try{
      const response = await axios.get(`http://localhost:8080/ratios/max/${recipeId}`);
      return response.data;
    }catch (error)  {
      handleApiError(error)
      return null;
    }
}
export const getCalRatio = async (recipeId,inputAmount) => {
  try {
    const response = await axios.get(`http://localhost:8080/ratios/byRecipeId/${recipeId}`,{params:{inputAmount}});
    return response.data;
  }catch (error) {
    handleApiError(error)
    return null;
  }
}

export const getTotalPrice = async (recipeId,inputAmount) => {
  try{
    const response = await axios.get(`http://localhost:8080/ratios/cost/byRecipeId/${recipeId}`,{params:{inputAmount}});
    return response.data;
  }catch (error) {
    handleApiError(error)
    return null;
  }
}
export const updateMaterialStock = async (materialId,updateStock) => {
  try{
    const response = await axios.patch(`http://localhost:8080/materials/updateStock/${materialId}`,{materialStock:updateStock});
    return response.data;

  }catch (error) {
    handleApiError(error)
    return null;
  }
}
export const updateMaterialPrice = async (materialId,updatePrice) => {
  try{
    const response = await axios.patch(`http://localhost:8080/materials/updatePrice/${materialId}`,{materialPrice:updatePrice});
    return response.data;

  }catch (error) {
    handleApiError(error)
    return null;
    }
}
export const updateMaterialStocks = async (materials)=>{
  try{
    const mapMaterials = materials.map(item =>({
      materialId : item.materialId,
      materialStock: item.materialStock-item.materialUse
    }))
    console.warn(mapMaterials);
    const response = await axios.patch(`http://localhost:8080/materials/updateStocks`,mapMaterials);
    return response.data;

  }catch (error){
     handleApiError(error)
    return null;
  }
}

// export const saveProductionLog = async(logs)=>{
//   try{
//     const currentBatch  = getBatchId()
//     const mapLogs = logs.map(item =>({
//       batchId:currentBatch,
//       materialName:item.materialName,
//       usedAmount:item.materialUse
//     }))
//     const response = await axios.post(`http://localhost:8080/logs`,mapLogs);
//     return response.data;
//   }catch (error) {
//     handleApiError(error)
//     return [];
//     }
// }


//แสดงผล logs บนตาราง
export const getAllLogs = async () => {
  try {
    const response = await axios.get("http://localhost:8080/logs");
    return response.data;
  } catch (error)  {
    handleApiError(error)
    return [];
  }
}

export const getBatchId = ()=>{
  const now = new Date();
  const datePart = now.toISOString().slice(2,10).replace(/-/g, '');
  const timePart = now.getTime().toString().slice(-4);
  const batchId = `B${datePart}${timePart}`;  
  return(batchId)
}

//ส่งข้อมูลไปให้ Production Controller
export const handleManufacture = async(logs)=>{
  try { 
        const currentBatch = getBatchId();
        const requestMaterials= logs.map(item=>({
          materialId: item.materialId,
          materialStock: item.materialStock-item.materialUse //อัพเดท stock หลังหักลบที่ใช้ออกไป
        }));
        const requestLogs= logs.map(item=>({
            batchId : currentBatch,
            materialName: item.materialName,
            usedAmount: item.materialUse
        }));
        //ส่ง requestBody โดยระบุในตรงกับ request ของ DTO
        const requestData = {stocks:requestMaterials,
                            logs:requestLogs}
        const response = await axios.post(`http://localhost:8080/produce`,requestData);
        return response.data
  } catch (error)  {
    handleApiError(error)
    return [];
  }
}