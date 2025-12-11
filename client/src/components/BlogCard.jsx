import React from 'react'; 
import { motion } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';

export default function BlogCard({ post }) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://blogify-9yis.onrender.com/api/posts/${post._id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
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

  return (
    <motion.article className="card" whileHover={{ scale: 1.02 }}>
      <header className="card-header">
        <h3>{post.title}</h3>
        <div className="author">
          <FaUserCircle />
          <span>{post.author?.name || 'Anonymous'}</span>
        </div>
      </header>

      <div className="card-body">
        <p>{post.body}</p>
      </div>

      <footer className="card-footer">
        <small>{new Date(post.createdAt).toLocaleString()}</small>

        <button 
          onClick={handleDelete}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "10px"
          }}
        >
          Delete
        </button>
      </footer>
    </motion.article>
  );
}
