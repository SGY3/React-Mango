import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import endpoints from "../api/endpoints";

const Login = () => {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // <-- loading state

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading

    try {
      const response = await axios.post(endpoints.auth.login, formData);

      if (response.data.isSuccess) {
        const { token, user } = response.data.result;
        login(user, token);
        navigate("/");
      } else {
        setErrorMessage(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="container border p-3 mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Login</h2>
      {errorMessage && (
        <div className="alert alert-danger">{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email / Username:</label>
          <input
            type="email"
            className="form-control"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
