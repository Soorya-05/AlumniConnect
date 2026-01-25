import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // If already logged in → go to dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AlumniConnect</h1>

      <p style={styles.subtitle}>
        A platform where students raise funds, alumni invest, and ideas grow.
      </p>

      <div style={styles.buttons}>
        <button onClick={() => navigate("/login")}>
          Login
        </button>

        <button onClick={() => navigate("/register")}>
          Sign Up
        </button>
      </div>

      <div style={styles.info}>
        <h3>How it works</h3>
        <ul>
          <li>🎓 Students create startup projects</li>
          <li>🤝 Alumni invest in promising ideas</li>
          <li>📈 Projects grow and exit</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    textAlign: "center"
  },
  title: {
    fontSize: "42px",
    marginBottom: 10
  },
  subtitle: {
    fontSize: "18px",
    maxWidth: 600,
    marginBottom: 30
  },
  buttons: {
    display: "flex",
    gap: 20,
    marginBottom: 40
  },
  info: {
    maxWidth: 600,
    fontSize: 14
  }
};
