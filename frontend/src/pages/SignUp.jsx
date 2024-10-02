import React, { useState } from "react";
import { Input, Button } from "../components";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate()
    const [formError, setFormError] = useState({
    username: false,
    password1: false,
    email: false,
    password2: false,
    });


  const [formData, setFormData] = useState({
    username: "",
    password1: "",
    email: "",
    password2: "",})

  const [error, setError] = useState(null);
  const produrl = "https://fololimo-api.onrender.com/api/v1/users/register/";
  const devurl = "http://127.0.0.1:8000/api/v1/users/register/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
        setFormError((prevState) => ({
            ...prevState,
            email: true,
        }));
      setError("Invalid email address");
      return;
    }

    // Validate passwords match
    if (formData.password1 !== formData.password2) {
        setFormError((prevState) => ({
            ...prevState,
            password1: true,
            password2: true,
        }));
      setError("Passwords do not match");
      return;
    }

    setError(null);

    const res = await fetch(devurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(res)

    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData.message || "An error occurred");
    } else {
      // Handle successful registration (e.g., redirect to login page)
      console.log("Registration successful");
      navigate("/login")
      // Optionally redirect or clear form
    }
  };

  document.title = "Jua Legal - SignUp";

  return (
    <div className="bg-slate-400 h-screen flex flex-col justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-500 p-6 w-3/4 sm:w-1/2 md:w-1/3  rounded-md"
      >
        <h1 className="text-center text-slate-600 text-2xl font-semibold mb-4">
          Create Account
        </h1>
        {error && (
          <p className="text-gray-200 rounded-md p-2 text-sm text-center mb-4 bg-red-300">{error}</p>
        )}
        
        <div className="mb-6">
          <Input
            placeholder="Email"
            error= {formError.email}
            type="email"
            value={formData.email}
            onChange={handleChange}
            name="email" // Changed to string "email"
          />
          <Input
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            name="username" // Changed to string "username"
          />
          <Input
            placeholder="Password"
            value={formData.password1}
            error= {formError.password1}
            onChange={handleChange}
            name="password1" // Changed to string "password"
            type="password" // Ensure this is hidden
          />
          <Input
            placeholder="Confirm Password"
            error= {formError.password2}
            value={formData.password2}
            onChange={handleChange}
            name="password2" // Changed to string "password2"
            type="password" // Ensure this is hidden
          />
        </div>
        <Button
          color="bg-slate-400"
          type="submit" // Set the type to "submit" instead of using click handler
          text="SignUp"
          textColor="slate-900"
        />
        <p className="text-center flex-wrap flex text-sm text-slate-700 my-4">
          Have an account? 
          <a href="/login" className="text-slate-900 text-sm">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
