// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// export default function Register({ setUser }){
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const navigate = useNavigate()

//   const submit = async (e) => {
//     e.preventDefault()
//     try {
//       const res = await axios.post(import.meta.env.VITE_API_URL + '/api/auth/register', { name, email, password })
//       localStorage.setItem('token', res.data.token)
//       localStorage.setItem('user', JSON.stringify(res.data.user))
//       setUser(res.data.user)
//       navigate('/')
//     } catch (err) {
//       console.error(err)
//       alert(err.response?.data?.message || 'Registration failed')
//     }
//   }

//   return (
//     <section className="content-card max-w-md mx-auto">
//       <h2>Register</h2>
//       <form onSubmit={submit} className="form">
//         <label>Name<input value={name} onChange={e=>setName(e.target.value)} required /></label>
//         <label>Email<input value={email} onChange={e=>setEmail(e.target.value)} required /></label>
//         <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></label>
//         <div><button className="btn">Create account</button></div>
//       </form>
//     </section>
//   )
// }

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import toast from "react-hot-toast"

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(import.meta.env.VITE_API_URL + '/api/auth/register', { name, email, password })

      toast.success("Registration successful!")
      setTimeout(() => navigate('/login'), 1000)
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed")
    }
    setLoading(false)
  }

  return (
    <section className="content-card max-w-md mx-auto animate__animated animate__fadeInUp">
      <h2>Create Account </h2>

      <form onSubmit={submit} className="form">
        <label>
          Name
          <input value={name} onChange={e=>setName(e.target.value)} required />
        </label>

        <label>
          Email
          <input value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>

        <label>
          Password
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e=>setPassword(e.target.value)}
              required
              style={{ flex: 1, paddingRight: "35px" }}
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
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      <p style={{ marginTop: 10, textAlign: "center" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  )
}

