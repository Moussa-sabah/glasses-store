import React from 'react'
import './Dashboard.css'
import DashboardSide from './dashboardSide'
import DashboardMain from './dashboardMain'


export default function Dashboard() {


  return (
    <div className='dashboard-page'>
      <DashboardSide />
      <DashboardMain />
    </div>
  )
}
