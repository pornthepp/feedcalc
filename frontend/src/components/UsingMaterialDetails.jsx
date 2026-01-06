import React, { useMemo } from 'react'
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table'
// import './StockTable.css'

export default function DetailsTable() {
  // 1. เตรียมข้อมูล
  const data = useMemo(() => [
    { id: 1001 ,name: 'แป้งสาลี', stock: 100, price:'500'},
    { id: 1002 ,name: 'ข้าวโพด', stock: 100, price:'500'}

  ], [])

  // 2. กำหนดคอลัมน์
  const columnHelper = createColumnHelper()
  const columns = [
    columnHelper.accessor('id', { header: 'รหัสวัตถุดิบ' }),
    columnHelper.accessor('name', { header: 'ชื่อวัตถุดิบ' }),
    columnHelper.accessor('stock', { header: 'ปริมาณในคลัง (กก.)' }),
    columnHelper.accessor('price', { header: 'ราคาวัตถุดิบ (บาท/กก.)' }),
  ]

  // 3. สร้าง Table Instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // 4. การ Render (ใช้ flexRender เพื่อวาดหัวข้อและเนื้อหา)
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}