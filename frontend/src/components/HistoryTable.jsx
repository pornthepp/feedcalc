import { useEffect, useState,React,useMemo}  from 'react'
import './HistoryTable.css'
import {getAllLogs} from '../services/Service.jsx'


export default function HistoryTable({doRefresh}) {
  const [logs,setLogs]=useState([]);
  
    useEffect(()=>{
    const loadData = async()=>{
      try{
          const data = await getAllLogs();
          setLogs(data);
      }catch (error) {
        console.error("Error loading data:", error);
      }
    };
  loadData();
  },[null,doRefresh])
return(
  <table className="history-table" >
    <thead >
      <tr>
        <th>เลข Log</th>
        <th>เลข Batch</th>
        <th>ชื่อวัตถุดิบ</th>
        <th>จำนวณที่ใช้ (กก.)</th>
        <th>วันที่</th>
      </tr>
    </thead>
    <tbody > 
      {logs.map((item, index) => (
        <tr key={index}>
          <td>{item.logId}</td>
          <td>{item.batchId}</td>
          <td>{item.materialName}</td>
          <td>{item.usedAmount}</td>
          <td>{item.date}</td>
        </tr>
                
      ))}
    </tbody>
  </table>
);}
