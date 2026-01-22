import { useEffect, useState,React,useMemo}  from 'react'
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table'
import './StockTable.css'
import {getAllMaterial} from '../services/Service.jsx'


export default function StockTable({doRefresh}) {
  const [materials,setMaterials]=useState([]);
  
    useEffect(()=>{
    const loadData = async()=>{
      try{
          const data = await getAllMaterial();
          setMaterials(data);
      }catch (error) {
        console.error("Error loading data:", error);
      }
    };
  loadData();
  },[null,doRefresh])
return(
  <table className="stock-table" >
    <thead >
      <tr>
        <th>รหัสวัตถุดิบ</th>
        <th>ชื่อวัตถุดิบ</th>
        <th>ราคา (บาท/กก.)</th>
        <th>คงเหลือ (กก.)</th>
      </tr>
    </thead>
    <tbody > 
      {materials.map((item, index) => (
        <tr key={index}>
          <td>{item.materialId}</td>
          <td>{item.materialName}</td>
          <td>{item.materialPrice}</td>
          <td>{item.materialStock}</td>
        </tr>
                
      ))}
    </tbody>
  </table>
);}
