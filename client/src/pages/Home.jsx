import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "../components/BlogCard";
import { Toaster, toast } from "react-hot-toast";
import { FaPenNib, FaCompass, FaFire, FaClock, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const handleCreateClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first to create a blog ✋");
      return;
    }
    navigate("/create");
  };

  useEffect(()=>{
    fetch(import.meta.env.VITE_API_URL + '/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(() => toast.error("Error fetching blogs ❌"))
  },[])
 
  return (
    <section className="home-container">
      <Toaster />

      <motion.div
        className="hero"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>
          Create Blogs With <span className="highlight">Blogify</span>
        </h1>
        <p>
          let your thoughts flow and share your stories with the world. Blogify!
        </p>

        <div className="hero-buttons">
          <button className="btn-primary" onClick={handleCreateClick}>
            <FaPenNib /> Create Blog
          </button>

          <button className="btn-outline">
            <FaCompass /> Explore
          </button>
        </div>
      </motion.div>

      <motion.div
        className="categories"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <button>
          <FaFire /> 
        </button>
        <button>
          <FaClock /> 
        </button>
        <button>
          <FaStar /> 
        </button>
      </motion.div>

      <section className="posts-scroll">
        {posts.length === 0 ? (
          <p className="muted">No posts yet — be the first to create one!</p>
        ) : (
          posts.map((p) => <BlogCard key={p._id} post={p} />)
        )}
      </section>
    </section>
  );
}
