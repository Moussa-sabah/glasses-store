import React, { useEffect } from 'react'
import DashboardSide from '../dashboard/dashboardSide'
import './Tables.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUsers } from '../../redux/apiCalls/AuthApiCall'

export default function UsersTable() {

  const dispatch = useDispatch()
  const { allUsers } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getAllUsers())
    // eslint-disable-next-line
  }, [allUsers])

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
  }

  return (

    <div className='users-table'>
      <DashboardSide />
      <div className='title-and-table'>
        <h1 className='table-title'>Users</h1>
        <div className='table'>
          <table >
            <thead>
              <th>Count</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </thead>

            <tbody>

              {allUsers?.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td><button onClick={() => { deleteUserHandler(user._id) }} className='delete-btn'>delete</button></td>
                  </tr>
                )
              })}

            </tbody>



          </table>
        </div>

      </div>
    </div>

  )
}
