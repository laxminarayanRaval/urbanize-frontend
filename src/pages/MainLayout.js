import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from '../component'

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout