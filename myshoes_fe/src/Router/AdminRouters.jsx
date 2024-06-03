import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardAdmin from '../Admin/DashBoard/DashboardAdmin'

const AdminRouters = () => {
  return (
    <div>
        <Routes>
            <Route path="/*" element={<DashboardAdmin/>}></Route>
        </Routes>
    </div>
  )
}

export default AdminRouters