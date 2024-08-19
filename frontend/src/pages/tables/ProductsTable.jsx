import React, { useEffect, useState } from 'react'
import DashboardSide from '../dashboard/dashboardSide'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProducts, getOneProduct } from '../../redux/apiCalls/ProductApiCall'
import EditProduct from '../../modals/Product/EditProduct'

export default function ProductsTable() {

  const dispatch = useDispatch()
  const { products } = useSelector(state => state.products)
  const [editMadal, setEditModal] = useState(false)
  useEffect(() => {
    dispatch(getAllProducts())
    // eslint-disable-next-line
  }, [products])

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
  }
  const getEditModal = (id) => {
    dispatch(getOneProduct(id))
    setTimeout(() => {
      setEditModal(true)
    }, 100);


  }
  return (
    <div className='users-table'>
      <DashboardSide />
      <div className='title-and-table'>
        <h1 className='table-title'>Products</h1>
        <div className='table'>
          <table >
            <thead>
              <th>Count</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Old price</th>
              <th>New price</th>
              <th>Action</th>
            </thead>

            <tbody>

              {products?.map((product, index) => {

                return (

                  <tr>
                    <td>{index + 1}</td>
                    <td>{product.title}</td>
                    <td>{product.brand}</td>
                    <td>{product.navbarChoise} / {product.category}</td>
                    <td>${product.oldPrice}</td>
                    <td>${product.newPrice}</td>
                    <td className='table-btns'>
                      <button onClick={() => { getEditModal(product?._id) }} className='edit-btn'>edit</button>
                      <button onClick={() => { deleteProductHandler(product?._id) }} className='delete-btn'>delete</button>

                    </td>
                  </tr>

                )
              })}

            </tbody>
          </table>
        </div>
        {editMadal && <EditProduct setEditModal={setEditModal} />}
      </div>

    </div>
  )
}
