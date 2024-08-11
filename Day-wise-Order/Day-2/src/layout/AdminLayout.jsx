import Leftbar from '@/components/Admin/Leftbar'
import Topbar from '@/components/Admin/Topbar'
import Navbar from '@/components/Shared/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-grow mt-16">
          <Leftbar className="mt-16" />
          <div className="flex-grow mt-5">
            <Outlet />
          </div>
        </div>
      </div>
    );
}

export default AdminLayout