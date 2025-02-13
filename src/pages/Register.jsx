import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const navigate = useNavigate(); // Corrected from `navigation`
  const { enqueueSnackbar } = useSnackbar();
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (event) => {
    setPasswordError(false);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.fullName === "" ||
      formData.confirm === ""
    ) {
      enqueueSnackbar("Please fill the form completely", { variant: "error" });
      return;
    }

    if (formData.password.length < 5) {
      enqueueSnackbar("Password length must be greater than 5", { variant: "error" });
      setPasswordError(true);
      return;
    }

    if (formData.password !== formData.confirm) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }

    const existingData = JSON.parse(localStorage.getItem("mediUsers")) || []; // Ensure same key as Login.jsx
    const userExists = existingData.some((user) => user.email === formData.email);

    if (userExists) {
      enqueueSnackbar("User already exists. Please use another email.", { variant: "error" });
      return;
    }

    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    };

    existingData.push(newUser);
    localStorage.setItem("mediUsers", JSON.stringify(existingData)); // Same key as Login.jsx

    enqueueSnackbar("User Registered Successfully", { variant: "success" });

    navigate("/login"); // Corrected redirection to Login page
  };

  return (
    <>
    <form className="mt-5 bg-white mt-5 p-5 justify-content-center" onSubmit={handleSubmit}>
      <h3>Register Now</h3>
      <div className="mb-3 ">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          className="form-control"
          placeholder="Enter your name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3 ">
        <label>Email address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <p><b>Confirm Password</b></p>
        <input
          type="password"
          name="confirm"
          className="form-control"
          placeholder="Confirm password"
          value={formData.confirm}
          onChange={handleChange}
          required
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-secondary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right brown">
        Already registered? <a href="/login">Log in</a>
      </p>

    </form>
    </>
  );
}

export default Register;
