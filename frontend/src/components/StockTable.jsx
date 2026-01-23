import { useEffect, useState,React,useMemo}  from 'react'
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table'
import './StockTable.css'
import {getAllMaterial} from '../services/Service.jsx'
import LoadingScreen from './LoadingScreen.jsx';



export default function StockTable({doRefresh}) {
  const [materials,setMaterials]=useState([]);
  const [loading,setLoading]=useState(true);

    useEffect(()=>{
    const loadData = async()=>{
      try{
          const data = await getAllMaterial();
          if(data && data.length > 0){
            setMaterials(data);
            setLoading(false);
          }else{
            console.warn("ยังไม่มีข้อมูล หรือเชื่อมต่อไม่ได้");
          }

      }catch (error) {
        console.error("Error loading data:", error);
      }
    };
  loadData();
  },[null,doRefresh])

  if (loading){
      return(
        <div>
          <LoadingScreen isLoading={loading}/>
        </div>
    );}

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
