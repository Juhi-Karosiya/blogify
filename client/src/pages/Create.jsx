import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaHeading, FaAlignLeft, FaPaperPlane } from "react-icons/fa"
import toast, {Toaster} from "react-hot-toast"
import { motion } from 'framer-motion'

export default function Create({ user }){
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error("Please login first")
      return
    }

    try {
      await axios.post(
        import.meta.env.VITE_API_URL + '/api/posts',
        { title, body },
        { headers: { Authorization: 'Bearer ' + token } }
      )

      toast.success("Post Published ")

      setTitle('')
      setBody('')

      setTimeout(() => navigate('/'), 2000)

    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating post")
    }
  }

  return (
    <motion.section
      className="content-card max-w-lg mx-auto"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
        Create a New Post
      </h2>

      <form onSubmit={submit} className="form">

        <label>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FaHeading /> Title
          </div>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder="Enter post title"
          />
        </label>

        <label>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FaAlignLeft /> Body
          </div>
          <textarea
            rows="6"
            value={body}
            onChange={e => setBody(e.target.value)}
            required
            placeholder="Write your blog content here..."
          ></textarea>
        </label>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.2 }}
          className="btn"
          style={{ width: "100%", display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}
        >
          <FaPaperPlane /> Post
        </motion.button>

      </form>
      <Toaster />
    </motion.section>
  )
}
