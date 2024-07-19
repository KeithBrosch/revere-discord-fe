import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SideNav } from './components/SideNav/SideNav'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SideNav/>
      <div className="outlet-container">
      <Outlet />
      </div>
    </>
  )
}

export default App
