import React, { useState } from "react";
import { Input, Button } from "../components";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState({
    username: false,
    password: false,
    });
  document.title = "Jua Legal - SignIn";
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
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setFormError((prevState) => ({
        ...prevState,
        email: true,
      }));
      setError("Invalid email address");
      return;
    }

    setError(null);
    const url = "https://fololimo-api.onrender.com/api/v1/users/login";

    try {
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
        console.log("Registration successful");
      }
    } catch (error) {
      setError("Something went wrong!!!");
    } finally {
      setFormData({
        username: "",
        password: "",
      });
    }
  };

  
  return (
    <div className="bg-slate-400 h-screen flex flex-col justify-center items-center ">
      <form onSubmit={handleSubmit} className="bg-slate-500 p-4 w-3/4 sm:w-1/2 md:w-1/3  rounded-md">
        <h1 className="text-center text-slate-600 text-2xl font-bold mb-4">
          Login
        </h1>
        <div className="mb-6">
          <Input
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            name="username" // Changed to string "username"
          />
          <Input
            placeholder="Password"
            value={formData.password}
            error={formError.password}
            onChange={handleChange}
            name="password" // Changed to string "password"
            type="password" // Ensure this is hidden
          />
        </div>
        <Button
          color="bg-slate-400"
          text="Login"
          textColor="slate-900"
        />
        <p className="text-center text-slate-700 my-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-slate-900">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
