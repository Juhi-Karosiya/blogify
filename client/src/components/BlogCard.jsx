import React from 'react'
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa'

  const handleDelete = async () => {
  if (!confirm("Are you sure you want to delete this blog?")) return;

  const token = localStorage.getItem("token");  // ✅ Get token from storage

  if (!token) {
    alert("Please login first!");
    return;
  }

  try {
    const res = await fetch(
      `https://blogify-9yis.onrender.com/api/posts/${post._id}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,  // ✅ Send token
        }
      }
    );

    if (res.ok) {
      alert("Blog deleted successfully!");
      window.location.reload(); 
    } else {
      alert("Failed to delete blog");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};
