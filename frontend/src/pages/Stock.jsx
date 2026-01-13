import React from 'react'
import Header from '../components/Header'
import StockTable from '../components/StockTable'
import SearchBox from '../components/SearchBox'
import AddMaterial from '../components/AddMaterial'
import "./Stock.css"


export default function Stock() {
  return (
    <div>
        <Header page="stock"/>
        <div className='stock-body-container'>
            <div className='stock-body-wrap'>
                <div className='stock-header-bar'>
                    <SearchBox/> 
                    <AddMaterial/>  
                </div>
                <div className='stock-table-wrap'>
                    <StockTable/>
                </div>
            </div>
        </div>
  </div>

  )
}
