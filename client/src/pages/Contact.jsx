import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import toast, {Toaster} from "react-hot-toast";

export default function Contact() {

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields ");
      return;
    }

    toast.success("Message Sent Successfully ");

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <motion.section
      className="content-card max-w-xl mx-auto p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-center mb-3"> Connect Us</h2>
      <p className="muted text-center mb-6">
        We'd love to hear from you!<br/>
        Whether you have a question, feedback, or
        just want to say hello, feel free to reach out using the form below.
      </p>

      <div className="mb-6 space-y-2">
        <p className="flex items-center gap-2">
          <FaEnvelope /> teamblogify@gmail.com
        </p>
        <p className="flex items-center gap-2">
          <FaPhoneAlt /> +91 9876543210
        </p>
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt /> Nagpur, India 🇮🇳
        </p>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <label>Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </label>

        <label>Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </label>

        <label>Message
          <textarea
            rows="5"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Type your message..."
          ></textarea>
        </label>

        <motion.button
          className="btn w-full mt-2"
          type="submit"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
        >
          Send Message
        </motion.button>
      </form>
      <Toaster/>
    </motion.section>
  );
}
