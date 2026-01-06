import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import "./DetailsTable.css";
import {getCalRatio} from "../services/Service.jsx"

export default function DetailsTable(props) {
  const {recipeId, processAmount}=props
  const [calRatio,setCalRatio] = useState([])
  useEffect(()=>{
    const loadData = async()=>{
      if (!recipeId) return;
      try{
          const data = await getCalRatio(recipeId,processAmount);
          setCalRatio(data);
      }catch (error) {
        console.error("Error loading data:", error);
      }
    };
  loadData();
  },[recipeId, processAmount])

return(
  <div className="table-scroll">
  <table className="custom-table">
    <thead>
      <tr>
        <th>วัตถุดิบ</th>
        <th>ปริมาณที่ใช้ (กก.)</th>
        <th>คงเหลือ (กก.)</th>
        <th>สถานะ</th>
      </tr>
    </thead>
    <tbody>
      {calRatio.map((item, index) => (
        <tr key={index}>
          <td>{item.materialName}</td>
          <td>{item.amount}</td>
          <td>{item.stock}</td>
          <td>{item.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
);

}
