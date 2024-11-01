import React, { useState } from "react";
import { Input, Button } from "../components";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

function Login() {
  const navigate = useNavigate();
  const [text, setText] = useState("SignUp");
  const [loading, setloading] = useState(false);
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
    // console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    setText("Signing in...");
    setError(null);
    // console.log("logging in");
    const devurl = `${BASE_URL}/api/v1/users/login/`;
    // console.log(devurl);
    try {
      const res = await fetch(devurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // console.log(res);
      if (!res.ok) {
        const errorData = await res.json();
        // console.log(errorData);
        setError(errorData.non_field_errors[0] || "An error occurred");
      } else {
        // console.log("Login successful");
        const data = await res.json();
        // console.log(data);
        localStorage.setItem("token", data.key);

        window.location.reload();
      }
    } catch (error) {
      setError("Something went wrong!!!");
    } finally {
      setFormData({
        username: "",
        password: "",
      });
      setloading(false);
      setText("Login");
    }
  };

  return (
    <div className="bg-slate-400 h-screen flex flex-col justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-500 p-4 w-3/4 sm:w-1/2 md:w-1/3  rounded-md"
      >
        <h1 className="text-center text-slate-600 text-2xl font-bold mb-4">
          Login
        </h1>
        {error && (
          <p className="text-gray-200 rounded-md p-2 text-sm text-center mb-4 bg-red-300">
            {error}
          </p>
        )}
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
          text={text}
          textColor="slate-900"
          type="submit"
          disabled={loading}
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
