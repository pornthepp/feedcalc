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

export const getCalRatio = async (recipeId,processAmount) => {
    try{
      const response = await axios.get(`http://localhost:8080/ratios/byRecipeId/${recipeId}`,{
        params:{amount:processAmount}
      });
      return response.data;
    }catch (error){
        console.error("Error fetching ratio:", error);
        return [];
    }
}