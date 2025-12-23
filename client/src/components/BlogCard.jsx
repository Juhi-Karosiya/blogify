import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

export default function BlogCard({ post, user }) {

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    const token = localStorage.getItem("token");

    await fetch(
      `https://blogify-9yis.onrender.com/api/posts/${post._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.location.reload();
  };

  return (
    <motion.article className="card">
      <header>
        <h3>{post.title}</h3>
        <div>
          <FaUserCircle />
          {post.author?.name || "Anonymous"}
        </div>
      </header>

      <p>{post.body}</p>

      <footer>
        <small>{new Date(post.createdAt).toLocaleString()}</small>

        {user && post.author?._id === user.id && (
          <button
            onClick={handleDelete}
            style={{ background: "red", color: "white" }}
          >
            Delete
          </button>
        )}
      </footer>
    </motion.article>
  );
}
