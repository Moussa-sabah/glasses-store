


import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllNavbarChoises, getOneNavbarChoise } from '../../redux/apiCalls/navbarChoiseApiCall'
import { getAllBrands, getOneBrand } from '../../redux/apiCalls/BrandApiCall'
import { getProductsByBarnds } from '../../redux/apiCalls/ProductApiCall'

export default function HeaderNavbar() {

  const dispatch = useDispatch()
  const { allNavbarChoises } = useSelector(state => state.navbarChoise)
  const { allBrands } = useSelector(state => state.brand)
  const [adminModal, setAdminModal] = useState(false)
  const [brandsModal, setBrandsModal] = useState(false)

  const goToProductsPage = (id) => {
    dispatch(getOneNavbarChoise(id))
    setAdminModal(false)
  }

  useEffect(() => {
    dispatch(getAllNavbarChoises())
    dispatch(getAllBrands())
    // eslint-disable-next-line
  }, []);

  const goToProdcutsByBrandPage = (id) => {
    dispatch(getOneBrand(id))
    setBrandsModal(false)
  }

  return (
    <div className="navbar">

      {allNavbarChoises?.map((item) => {
        return <Link key={item._id} onClick={() => { goToProductsPage(item?._id);setBrandsModal(false) }} to={`/products/${item?.title}`} className='navbar-link'>{item?.title}</Link>
      })}


      <div className='brands-option'>
        <Link onClick={() => { if (brandsModal) { setBrandsModal(false) } else { setBrandsModal(true); setAdminModal(false) } }} className='navbar-link'>brands</Link>
        {brandsModal && <div className='brands-modal'>
          {allBrands?.map((item) => {
            return <Link key={item._id} onClick={() => { goToProdcutsByBrandPage(item._id) }} to={`/products/brands/${item.title}`} className='brand-link'>{item.title}</Link>
          })}
        </div>}
      </div>

      <div className='admin-option'>
        <Link onClick={() => { if (adminModal) { setAdminModal(false) } else { setAdminModal(true); setBrandsModal(false) } }} className='navbar-link'>admin</Link>
        {adminModal && <div className='dashboard-create'>
          <Link onClick={() => { setAdminModal(false) }} to='/dashboard' className='navbar-link'>dashboard</Link>
          <Link onClick={() => { setAdminModal(false) }} to='/create-product' className='navbar-link'>create product</Link>
        </div>}
      </div>

      {/* <input className='navbar-input' type="text" placeholder="&#xF52A; i am lookin for" /> */}
    </div>
  )
}
