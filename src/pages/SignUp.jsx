import React, { useState } from "react";
import { Input, Button } from "../components";

function SignUp() {
    const [formError, setFormError] = useState({
    username: false,
    password: false,
    email: false,
    confirmPassword: false,
    });


  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const url = "https://fololimo-api.onrender.com/api/v1/users/register";

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
    if (formData.password !== formData.confirmPassword) {
        setFormError((prevState) => ({
            ...prevState,
            password: true,
            confirmPassword: true,
        }));
      setError("Passwords do not match");
      return;
    }


    // Clear error if validation passes
    setError(null);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData.message || "An error occurred");
    } else {
      // Handle successful registration (e.g., redirect to login page)
      console.log("Registration successful");
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
            value={formData.password}
            error= {formError.password}
            onChange={handleChange}
            name="password" // Changed to string "password"
            type="password" // Ensure this is hidden
          />
          <Input
            placeholder="Confirm Password"
            error= {formError.password}
            value={formData.password1}
            onChange={handleChange}
            name="confirmPassword" // Changed to string "confirmPassword"
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
