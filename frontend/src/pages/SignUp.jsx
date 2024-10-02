import React, { useState } from "react";
import { Input, Button } from "../components";
import { useNavigate, Link } from "react-router-dom"; // Use Link for SPA navigation
import { BASE_URL } from "../constants";

function SignUp() {
  const navigate = useNavigate();
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
    password2: "",
  });

  const [error, setError] = useState(null);
  const devurl = `${BASE_URL}/api/v1/users/auth/register/`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormError((prevState) => ({ ...prevState, [name]: false })); // Clear error for the field
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

    setError(null); // Clear any previous error

    try {
      const res = await fetch(devurl, {
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
        navigate("/login");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    }
  };

  document.title = "Jua Legal - SignUp";

  return (
    <div className="bg-slate-400 h-screen flex flex-col justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-500 p-6 w-3/4 sm:w-1/2 md:w-1/3 rounded-md"
      >
        <h1 className="text-center text-slate-600 text-2xl font-semibold mb-4">
          Create Account
        </h1>
        {error && (
          <p className="text-gray-200 rounded-md p-2 text-sm text-center mb-4 bg-red-300">
            {error}
          </p>
        )}
        <div className="mb-6">
          <Input
            placeholder="Email"
            error={formError.email}
            type="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />
          <Input
            placeholder="Username"
            error={formError.username}
            value={formData.username}
            onChange={handleChange}
            name="username"
          />
          <Input
            placeholder="Password"
            value={formData.password1}
            error={formError.password1}
            onChange={handleChange}
            name="password1"
            type="password"
          />
          <Input
            placeholder="Confirm Password"
            error={formError.password2}
            value={formData.password2}
            onChange={handleChange}
            name="password2"
            type="password"
          />
        </div>
        <Button
          color="bg-slate-400"
          type="submit"
          text="SignUp"
          textColor="slate-900"
        />
        <p className="text-center text-sm text-slate-700 my-4">
          Have an account?{" "}
          <Link to="/login" className="text-slate-900 text-sm">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
