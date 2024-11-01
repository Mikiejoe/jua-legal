import React, { useState } from "react";
import { Footer, NavBar } from "../components";

function Contact() {
  document.title = "Jua Legal - Contact";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, such as sending data to backend
    // console.log("Form Submitted:", formData);
    setFormData({ name: "", email: "", message: "" }); // Clear form after submission
  };
  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-slate-500 to-slate-600">
      <NavBar />
      <div className="min-h-scren bg-gradient-to-b from-slate-500 to-slate-50 flex flex-col justify-center items-center p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
        <p className="text-gray-100 mb-8 text-center">
          Have any questions or need legal advice? Get in touch with us!
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-gradient-to-b from-slate-400 to-slate-200 rounded-lg shadow-lg p-8"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Send Message
          </button>
        </form>

        
      </div>
      <Footer/>
    </div>
  );
}

export default Contact;
