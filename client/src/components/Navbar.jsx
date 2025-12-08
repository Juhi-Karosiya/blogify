import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaGoogleWallet,
  FaHome,
  FaEnvelope,
  FaPlusCircle,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt
} from 'react-icons/fa'

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  return (
<motion.nav
  className="navbar flex justify-between items-center px-6 py-4 bg-white shadow"
  whileHover={{ scale: 1.01 }}
  whileTap={{ scale: 0.99 }}
  transition={{ type: "spring", stiffness: 200 }}
>
  <div className="brand flex items-center gap-2 text-xl font-semibold">
    <FaGoogleWallet size={25} className="text-green-600" />
    <Link to="/" className="hover:text-green-700 transition">Blogify</Link>
  </div>

  <div className="links flex items-center gap-4">
    <Link className="nav-item" to="/">
      <FaHome /> Home
    </Link>

    <Link className="nav-item" to="/contact">
      <FaEnvelope /> Contact
    </Link>

    {user ? (
      <>
        <Link className="nav-item" to="/create">
          <FaPlusCircle /> Create
        </Link>

        <button className="logout-btn" onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>
      </>
    ) : (
      <>
        <Link className="nav-item" to="/login">
          <FaSignInAlt /> Login
        </Link>

        <Link className="nav-item" to="/register">
          <FaUserPlus /> Register
        </Link>
      </>
    )}
  </div>
</motion.nav>
  )
}
