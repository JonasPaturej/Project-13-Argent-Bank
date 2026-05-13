import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginUser({ email, password, rememberMe }));
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa-solid fa-circle-user sign-in-icon"></i>
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input type="text" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>

          <div className="input-remember">
            <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>
            <label htmlFor="remember-me">Remember me</label>
          </div>

          {error && <p>{error}</p>}

          <button type="submit" className="sign-in-button" disabled={loading}>
            {loading ? "Chargement..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;