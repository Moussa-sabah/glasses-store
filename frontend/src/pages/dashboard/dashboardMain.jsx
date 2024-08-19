
import React from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom'
export default function DashboardMain() {
  return (
    <div className='dashboard-main'>
      <div className='dashboard-main-carts'>
        <div className='main-cart'>
          <p className='name'>Users</p>
          <p className='number'>100</p>
          <Link to='/dashboard/users' className='seeAll-icon'>
            <button className='seeAll-btn'>See all users</button>
            <i class="bi bi-person-fill main-icon"></i>
          </Link>
        </div>
        <div className='main-cart'>
          <p className='name'>Products</p>
          <p className='number'>100</p>
          <div className='seeAll-icon'>
            <button className='seeAll-btn'>See all products</button>
            <i class="bi bi-stickies-fill main-icon"></i>
          </div>
        </div>
        <div className='main-cart'>
          <p className='name'>Categories</p>
          <p className='number'>100</p>
          <div className='seeAll-icon'>
            <button className='seeAll-btn'>See all categories</button>
            <i class="bi bi-tags-fill main-icon"></i>
          </div>
        </div>
        <div className='main-cart'>
          <p className='name'>Brands</p>
          <p className='number'>100</p>
          <div className='seeAll-icon'>
            <button className='seeAll-btn'>See all brands</button>
            <i class="bi bi-sunglasses main-icon"></i>
          </div>
        </div>
      </div>
    </div>
  )
}
