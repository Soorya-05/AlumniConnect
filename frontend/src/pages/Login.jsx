import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", formData);

    // 🔐 SAFELY extract user no matter backend shape
    const loggedInUser =
      res.data.user ??
      res.data;

    if (!loggedInUser || !loggedInUser.role) {
      throw new Error("Invalid login response shape");
    }

    // Save session (token may be inside or outside)
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...loggedInUser,
        token: res.data.token || loggedInUser.token
      })
    );

    // ---- MULTI ACCOUNT STORAGE (SAFE) ----
    const raw = localStorage.getItem("knownUsers");
    const existingUsers = raw ? JSON.parse(raw) : [];

    // Use EMAIL if present, otherwise fallback to _id
    const uniqueKey = loggedInUser.email || loggedInUser._id;

    const alreadyExists = existingUsers.some(
      u => u.email === uniqueKey || u._id === uniqueKey
    );

    if (!alreadyExists) {
      existingUsers.push({
        name: loggedInUser.name,
        email: loggedInUser.email, // may be undefined, OK
        role: loggedInUser.role,
        _id: loggedInUser._id
      });
    }

    localStorage.setItem(
      "knownUsers",
      JSON.stringify(existingUsers)
    );
    // -------------------------------------

    navigate("/dashboard");
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    alert("Login failed");
  }
};






  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
