import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Create from './pages/Create'

<Route path="/" element={<Home user={user} />} />

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
  const token = localStorage.getItem('token')
  const rawUser = localStorage.getItem('user')

  if (!token || !rawUser || rawUser === "undefined") {
    setUser(null)
    return
  }

  try {
    const userData = JSON.parse(rawUser)
    setUser(userData)
  } catch (err) {
    console.error("Invalid user JSON", err)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
  }
}, [])

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
