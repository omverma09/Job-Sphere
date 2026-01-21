import React from 'react'
import LoggedInNavbar from '../components/dashboardcompo/LoggedInNavbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <>
      <LoggedInNavbar />
       <main >
        <Outlet />
      </main>
      <Footer/>
    </>
  )
}
