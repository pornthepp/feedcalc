import React, { useState } from 'react'
import Header from '../components/Header.jsx'
import"./History.css"
import HistoryTable from '../components/HistoryTable.jsx'
export default function History() {
  const [loading,setLoading] = useState()

  return (
    <div>
      <Header page="history"/>
      <div className='history-body-container'>
          <div className='history-body-wrap'>
              <HistoryTable />
          </div>
      </div>
    </div>
  )
}
