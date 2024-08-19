import React, { useEffect, useState } from 'react'
import DashboardSide from '../dashboard/dashboardSide'
import { useDispatch, useSelector } from 'react-redux'
import EditNavbarChoise from '../../modals/navbarChoise/EditNavbarChoise'
import { deleteCategory, deleteNavbarChoise, getAllNavbarChoises, getOneCategory, getOneNavbarChoise } from '../../redux/apiCalls/navbarChoiseApiCall'
import EditCategory from '../../modals/Category/EditCategory'
import AddCategory from '../../modals/Category/AddCategory'
import AddNavbarChoise from '../../modals/navbarChoise/AddNavbarChoise'

export default function CategoriesTable() {

  const dispach = useDispatch()
  const [editNavbarChoiseModal, setEditNavbarChoiseModal] = useState(false)
  const [editCategoryModal, setEditCategoryModal] = useState(false)
  const [addCategoryModal, setAddCategoryModal] = useState(false)
  const [addNavbarChoiseModal, setAddNavbarChoiseModal] = useState(false)
  const { allNavbarChoises } = useSelector(state => state.navbarChoise)
  const [index, setIndex] = useState(0)
  const { oneNavbarChoise } = useSelector(state => state.navbarChoise)

  useEffect(() => {

    dispach(getOneNavbarChoise(allNavbarChoises ? allNavbarChoises[index]?._id : null))
    // eslint-disable-next-line
  }, [allNavbarChoises?.length > 0, index])


  useEffect(() => {
    dispach(getAllNavbarChoises())
    // eslint-disable-next-line
  }, [allNavbarChoises])

  const getEditNavbarChoiseModal = (id) => {
    dispach(getOneNavbarChoise(id))
    setTimeout(() => {
      setEditNavbarChoiseModal(true)
    }, 100);

  }

  const getEditCategoryModal = (id) => {
    dispach(getOneCategory(id))
    setTimeout(() => {
      setEditCategoryModal(true)
    }, 100);
  }

  const getAddCategoryModal = () => {
    setAddCategoryModal(true)
  }

  const getAddNavbarChoiseModal = () => {
    setAddNavbarChoiseModal(true)
  }

  const deleteNavbarChoiseHandler = (id) => {
    dispach(deleteNavbarChoise(id))
  }

  const deleteCategoryHandler = (id) => {
    dispach(deleteCategory(id))
  }

  return (
    <div className='users-table'>
      <DashboardSide />
      <div className='all-catrgories-tables'>
        <div className='title-and-table-catrgories'>
          <div className='title-add'>
            <h1 className='table-title-categories'>Navbar choises</h1>
            <button onClick={() => { getAddNavbarChoiseModal() }} className='to-add-navbarChoise-btn'>add new navbar choise</button>
          </div>
          <div className={`table-catrgories ${allNavbarChoises?.length > 4 && 'over'}`}>
            <table >
              <thead>
                <th>Count</th>
                <th>Title</th>
                <th>Action</th>
              </thead>

              <tbody>

                {allNavbarChoises?.map((item, index) => {
                  return (

                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td className='table-btns'>
                        <button onClick={() => { getEditNavbarChoiseModal(item?._id) }} className='edit-btn'>edit</button>
                        <button onClick={() => { setIndex(index) }} className='edit-btn'>categories</button>
                        <button onClick={() => { deleteNavbarChoiseHandler(item?._id) }} className='delete-btn'>delete</button>
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
            <div className='title-add'><h2 className='getCategories-title'>{oneNavbarChoise?.title} categories</h2>
              <button onClick={() => { getAddCategoryModal() }} className='to-add-category-btn'>add new category</button></div>
            <div className={`getCategories-table ${oneNavbarChoise?.categories?.length > 4 && 'over'}`}>
              <table>
                <thead>
                  <th>count</th>
                  <th>title</th>
                  <th>action</th>
                </thead>
                <tbody>
                  {allNavbarChoises?.length > 0 && oneNavbarChoise?.categories?.map((item, index) => {
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
        {editNavbarChoiseModal && <EditNavbarChoise setEditNavbarChoiseModal={setEditNavbarChoiseModal} />}
        {addNavbarChoiseModal && <AddNavbarChoise setAddNavbarChoiseModal={setAddNavbarChoiseModal} />}
        {editCategoryModal && <EditCategory setEditCategoryModal={setEditCategoryModal} />}
        {addCategoryModal && <AddCategory setAddCategoryModal={setAddCategoryModal} navbarChoise={oneNavbarChoise?._id} />}
      </div>
    </div>



  )
}
