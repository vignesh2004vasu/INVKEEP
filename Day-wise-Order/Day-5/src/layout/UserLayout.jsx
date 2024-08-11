
import Leftbar from '@/components/Admin/Leftbar'
import Navbar from '@/components/Shared/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'


const UserLayout = () => {
    return (
        <div className="flex flex-col h-screen">
        <Navbar />
       
            <Outlet />
         
      </div>
    )
}

export default UserLayout