import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "./Navbar.css";

function CustomNavbar() {
  const { user, logout } = useAuth();

  return (
    <Navbar className=" navbar-expand-lg navbar-dark bg-dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="name">
          <b>DataStore</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
            Selected Carts
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites">
            Shortlisted Profiles
            </Nav.Link>

            
           
          </Nav>
          <Nav>
          {user ? (
            <>
             
             <Button variant="outline-light" onClick={logout}>Logout</Button>
            </>
            ) : (
            <>
             <Nav.Link as={Link} to="/login">Login</Nav.Link>
             <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
            )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;