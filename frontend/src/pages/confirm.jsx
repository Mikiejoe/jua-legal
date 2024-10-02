import React, { useState } from "react";
import { BASE_URL } from "../constants";
import { Input } from "../components";

function confirm() {
  const [code, setCode] = useState("");

  const confirmEmail = async (e) => {
    e.preventDefault();
    const devurl = `${BASE_URL}/api/v1/users/account-confirm-email/`;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(devurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: code }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCode(value);
  };

  return (
    <div>
      <h1>Confirm Email</h1>
      <p>Enter the code sent to your email below.</p>
      <form onSubmit={confirmEmail}>
        <Input
          placeholder="Enter code"
          name="code"
          onChange={handleChange}
          value={code}
        />
        <button type="submit">Confirm Email</button>
      </form>
    </div>
  );
}

export default confirm;
