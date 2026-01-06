// Service.js
import axios from "axios";
import { useState,useEffect } from "react";

export const getAllRecipe = async () => {
  try {
    const response = await axios.get("http://localhost:8080/recipes");
    return response.data;
  } catch (error) {
        console.error("Error fetching recipes:", error);
    return [];
  }
}

export const getAllMaterial = async () => {
  try {
    const response = await axios.get("http://localhost:8080/materials");
    return response.data;
  } catch (error) {
        console.error("Error fetching materials:", error);
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
    } catch (error) {
        console.error("Error fetching ratio:", error);
        return [];
    }
}
//ดึง ratio 100% มาคำนวณตามจำนวณน้ำหนักที่ต้องการผลิต
export const getCalRatio = async (props) => {
    try{
      const [id,amount] = props
      const [ratio,setRatio]=useState([]);
      useEffect(()=>{
          const loadData = async()=>{
              const data = await getRatioByRecipeId(id);  // <= เรียก fn
              //setState
              setRatio(data);
        };
      loadData();
      });
      console.log("test"+ratio)


    }catch (error){
        console.error("Error fetching ratio:", error);
        return [];
    }


}