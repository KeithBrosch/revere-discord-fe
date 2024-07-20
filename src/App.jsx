import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SideNav } from './components/SideNav/SideNav'
import './App.css'

function App() {

  return (
    <>
      <SideNav/>
      <div className="outlet-container">
        {/* todo: implement navigable breadcrumbs */}
        <Outlet />
      </div>
    </>
  )
}

export default App
