

import React, { useEffect, useState } from 'react'
import DashboardSide from '../dashboard/dashboardSide'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, deleteNavbarChoise, getAllNavbarChoises, getOneCategory, getOneNavbarChoise } from '../../redux/apiCalls/navbarChoiseApiCall'
import EditBrand from '../../modals/Brand/EditBrand'
import AddBrand from '../../modals/Brand/AddBrand'
import EditBrandCategory from '../../modals/BrandCategory/EditBrandCategory'
import AddBrandCategory from '../../modals/BrandCategory/AddBrandCategory'
import { deleteBrand, deleteBrandCategory, delteBrandCategory, getAllBrands, getOneBrand, getOneBrandCategory } from '../../redux/apiCalls/BrandApiCall'

export default function BrandsTable() {

  const dispach = useDispatch()
  const [editBrandModal, setEditBrandModal] = useState(false)
  const [editBrandCategoryModal, setEditBrandCategoryModal] = useState(false)
  const [addBrandCategoryModal, setAddBrandCategoryModal] = useState(false)
  const [addBrandModal, setAddBrandModal] = useState(false)
  const { allBrands } = useSelector(state => state.brand)
  const [index, setIndex] = useState(0)
  const { oneBrand } = useSelector(state => state.brand)

  useEffect(() => {

    dispach(getOneBrand(allBrands ? allBrands[index]?._id : null))
    // eslint-disable-next-line
  }, [allBrands?.length > 0, index, oneBrand?.categories])


  useEffect(() => {
    dispach(getAllBrands())
    // eslint-disable-next-line
  }, [allBrands])

  const getEditBrandModal = (id) => {

    setTimeout(() => {
      setEditBrandModal(true)
    }, 100);

  }

  const getEditCategoryModal = (id) => {
    dispach(getOneBrandCategory(id))
    setTimeout(() => {
      setEditBrandCategoryModal(true)
    }, 100);
  }

  const getAddCategoryModal = () => {
    setAddBrandCategoryModal(true)
  }

  const getAddNavbarChoiseModal = () => {
    setAddBrandModal(true)
  }

  const deleteBrandHandler = (id) => {
    dispach(deleteBrand(id))
  }

  const deleteCategoryHandler = (id) => {
    dispach(deleteBrandCategory(id))
  }

  return (
    <div className='users-table'>
      <DashboardSide />
      <div className='all-catrgories-tables'>
        <div className='title-and-table-catrgories'>
          <div className='title-add'>
            <h1 className='table-title-categories'>brands</h1>
            <button onClick={() => { getAddNavbarChoiseModal() }} className='to-add-navbarChoise-btn'>add new brand</button>
          </div>
          <div className={`table-catrgories ${allBrands?.length > 4 && 'over'}`}>
            <table >
              <thead>
                <th>Count</th>
                <th>Title</th>
                <th>Action</th>
              </thead>

              <tbody>

                {allBrands?.map((item, index) => {
                  return (

                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td className='table-btns'>
                        <button onClick={() => { getEditBrandModal(item?._id); setIndex(index) }} className='edit-btn'>edit</button>
                        <button onClick={() => { setIndex(index) }} className='edit-btn'>categories</button>
                        <button onClick={() => { deleteBrandHandler(item?._id) }} className='delete-btn'>delete</button>
                      </td>
                    </tr>

                  )
                })}

              </tbody>
            </table>
          </div>

        </div>

        <div className='getCategories'>
          <div className='title-add-table'>
            <div className='title-add'><h2 className='getCategories-title'>{oneBrand?.title} categories</h2>
              <button onClick={() => { getAddCategoryModal() }} className='to-add-category-btn'>add new category</button></div>
            <div className={`getCategories-table ${oneBrand?.categories?.length > 4 && 'over'}`}>
              <table>
                <thead>
                  <th>count</th>
                  <th>title</th>
                  <th>action</th>
                </thead>
                <tbody>
                  {allBrands?.length > 0 && oneBrand?.categories?.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>
                          <button onClick={() => { getEditCategoryModal(item?._id) }} className='edit-button'>edit</button>
                          <button onClick={() => { deleteCategoryHandler(item?._id) }} className='delete-button'>delete</button>
                        </td>

                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {editBrandModal && <EditBrand setEditBrandModal={setEditBrandModal} />}
        {addBrandModal && <AddBrand setAddBrandModal={setAddBrandModal} />}
        {editBrandCategoryModal && <EditBrandCategory setEditBrandCategoryModal={setEditBrandCategoryModal} />}
        {addBrandCategoryModal && <AddBrandCategory setAddBrandCategoryModal={setAddBrandCategoryModal} brand={oneBrand?._id} />}
      </div>
    </div>



  )
}
