import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useSnackbar } from "notistack";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (formData.email === "" || formData.password === "") {
      enqueueSnackbar("Please fill the form completely", { variant: "error" });
      return;
    }
  
    if (formData.password.length < 5) {
      enqueueSnackbar("Password length must be greater than 5", { variant: "error" });
      return;
    }
  
    const users = JSON.parse(localStorage.getItem("mediUsers")) || []; // Ensure users is an array
  
    if (!Array.isArray(users) || users.length === 0) {
      enqueueSnackbar("No registered users found. Please sign up first.", {
        variant: "error",
      });
      return;
    }
  
    const filteredData = users.filter(
      (each) =>
        each.email === formData.email && each.password === formData.password
    );
  
    if (filteredData.length === 0) {
      enqueueSnackbar("User doesn't exist. Please enter valid details", {
        variant: "error",
      });
      return;
    }
  
    login(filteredData[0]); // Set the user in context
  
    navigate("/");
  
    enqueueSnackbar("Login completed successfully", {
      variant: "success",
    });
  };

  return (
    <Container className="login-page mt-5 bg-white p-4">
      <h2 className="login-box m-5">Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>

        <Button
          variant="link"
          className="mt-3"
          onClick={() => navigate("/register")}
        >
          Register Now
        </Button>
      </Form>
    </Container>
  );
}

export default Login;