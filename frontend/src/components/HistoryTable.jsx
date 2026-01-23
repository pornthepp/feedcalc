    import { useEffect, useState,React,useMemo}  from 'react'
    import './HistoryTable.css'
    import {getAllLogs} from '../services/Service.jsx'
    import LoadingScreen from './LoadingScreen.jsx';

    export default function HistoryTable({doRefresh}) {
      const [logs,setLogs]=useState([]);
      const [loading,setLoading]=useState(true);


        useEffect(()=>{
        const loadData = async()=>{
          try{
              const data = await getAllLogs();
              if(data.length > 0){
                setLogs(data);
                setLoading(false)
              }else{
                console.warn("ยังไม่มีข้อมูล หรือเชื่อมต่อไม่ได้");
              }
          }catch (error) {
            console.error("Error loading data:", error);
          }
        };
      loadData();
      },[doRefresh])

    if (loading){
      return(
        <div>
          <LoadingScreen isLoading={loading}/>
        </div>
      );}
      
    return(
      <div className='history-warp'>
      <table className="history-table" >
        <thead >
          <tr>
            <th>รหัสการจัดเก็บ</th>
            <th>เลขที่ Batch</th>
            <th>สูตร</th>
            <th>จำนวณ Batch (กก)</th>
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
              <td>{item.batchRecipe}</td>
              <td>{item.batchAmount}</td>
              <td>{item.materialName}</td>
              <td>{item.usedAmount}</td>
              <td>{item.date}</td>
            </tr>
                    
          ))}
        </tbody>
      </table>
    </div>
    );}
