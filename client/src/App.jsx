import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Create from './pages/Create'

export default function App(){
  const [user, setUser] = useState(null)
  useEffect(()=>{
    const token = localStorage.getItem('token')
    const userData = JSON.parse(localStorage.getItem('user') || 'null')
    if(token && userData){
      setUser(userData)
    }
  },[])
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/create" element={<Create user={user} />} />
        </Routes>
      </main>
    </>
  )
}
