
import Leftbar from '@/components/Admin/Leftbar'
import Navbar from '@/components/Shared/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'


const UserLayout = () => {
    return (
        <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-grow mt-16">
          <Leftbar className="mt-16" />
          <div className="flex-grow p-4 mt-16 mx-6">
            <Outlet />
          </div>
        </div>
      </div>
    )
}

export default UserLayout