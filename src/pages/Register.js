import  { useState } from "react";
import axios from "axios";
import endpoints from "../api/endpoints";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
    role: "Customer", // default role (optional)
  });

  const [response, setResponse] = useState({ message: "", isSuccess: null });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(endpoints.auth.register,formData);

      if (res.data && res.data.isSuccess) {
        setResponse({ message: "Registration successful!", isSuccess: true });
        setFormData({ email: "", name: "", phoneNumber: "", password: "", role: "Customer" });
      } else {
        setResponse({ message: res.data.message || "Registration failed", isSuccess: false });
      }
    } catch (err) {
      setResponse({
        message: err.response?.data?.message || "Server error",
        isSuccess: false,
      });
    }
  };

  return (
    <div className="container border p-3 mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Register</h2>
      {response.message && (
        <div className={`alert ${response.isSuccess ? "alert-success" : "alert-danger"}`}>
          {response.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Name:</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Phone Number:</label>
          <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        {/* Optional: Role selection */}
        <div className="mb-3">
          <label>Role:</label>
          <select className="form-select" name="role" value={formData.role} onChange={handleChange}>
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;
