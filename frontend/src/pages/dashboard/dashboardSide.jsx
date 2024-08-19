

import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

export default function DashboardSide() {
  return (

    <div className='dashboard-side'>


      <Link to='/dashboard' className='side-title' >Dashboard</Link>

      <div className='side-links'>


        <Link to='/dashboard/users' className='side-link'> <i class="bi bi-person-fill side-icon"></i>Users</Link>



        <Link to='/dashboard/products' className='side-link'> <i class="bi bi-stickies-fill side-icon"></i>Prodcuts</Link>




        <Link to='/dashboard/categories' className='side-link'><i class="bi bi-tags-fill side-icon"></i>Categories</Link>
        <Link to='/dashboard/brands' className='side-link'><i class="bi bi-sunglasses side-icon"></i>Brands</Link>

      </div>
    </div>
  )
}
