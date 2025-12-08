

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import toast from "react-hot-toast"

export default function Login({ setUser }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + '/api/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setUser(res.data.user)

      toast.success("Login successful ✅")
      setTimeout(() => navigate('/'), 800)
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed")
    }
    setLoading(false)
  }

  return (
    <section className="content-card max-w-md mx-auto animate__animated animate__fadeInUp">
      <h2>Welcome </h2>

      <form onSubmit={submit} className="form">
        
        <label>
          Email
          <input value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>

        <label>
          Password
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e=>setPassword(e.target.value)}
              required
              style={{ paddingRight: "35px" }}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: 10, top: "30%", cursor: "pointer" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </label>

        <button className="btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: 10, textAlign: "center" }}>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </section>
  )
}
