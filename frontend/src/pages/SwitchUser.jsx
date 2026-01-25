import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SwitchUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("knownUsers")) || [];
    setUsers(stored);

    // ensure logged out
    localStorage.removeItem("user");
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const removeUser = (id) => {
    const updated = users.filter(u => u._id !== id);
    setUsers(updated);
    localStorage.setItem("knownUsers", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Switch Account</h2>

      {users.length === 0 ? (
        <p>No previously used accounts.</p>
      ) : (
        users.map((u) => (
          <div
            key={u._id}   // ✅ IMPORTANT
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              border: "1px solid #ccc",
              padding: 10,
              borderRadius: 6
            }}
          >
            <div>
              <strong>{u.name}</strong>
              <div style={{ fontSize: 13 }}>{u.email}</div>
              <div style={{ fontSize: 12, color: "#777" }}>
                Role: {u.role}
              </div>
            </div>

            <div>
              <button onClick={handleLogin}>Sign in</button>
              <button
                style={{ marginLeft: 10, color: "red" }}
                onClick={() => removeUser(u._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      <hr style={{ margin: "20px 0" }} />

      <button onClick={handleLogin}>
        Sign in with another account
      </button>
    </div>
  );
}
