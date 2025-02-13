import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useAuth } from "../context/AuthContext";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom"; 
import "./Home.css";
import Contact from "../Contact"; 

function Home() {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [searchQuery, setSearchQuery] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { addToCart, addToFavorites, profiles = [] } = useAuth(); // ✅ Fix: Default profiles to an array
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUsersItems = async () => {
      try {
        setLoading(true); 
        const response = await axios.get("https://csa-batch79-react.onrender.com/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Error occurred", err);
        enqueueSnackbar("Failed to fetch users", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchUsersItems();
  }, [enqueueSnackbar]);

  // ✅ Ensure profiles is always an array before merging
  const allProfiles = [...profiles, ...users];

  // Filter profiles based on search query
  const filteredData = allProfiles.filter(
    (each) =>
      each.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      each.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); 
  };

  const handleAddToCart = (user) => {
    addToCart(user);
    navigate("/cart"); 
  };

  const handleAddToFavorites = (user) => {
    addToFavorites(user); 
    navigate("/favorites"); 
  };

  return (
    <Container>
      <h1 className="body my-2">Applications</h1>
      <p className="m-3"><small>Here we Select candidates with card data we have. And there skills personal abilities can matter. </small></p>
      <p className="m-3"><small>Upload You are data and participate in this program. And expect a unexpected future upgrade.To participate in this Program plz Create a Account.</small></p>
      <Form.Control
        type="text"
        placeholder="Search usersData..."
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 search-bar p-3"
      />
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {filteredData.map((user, index) => ( 
            <Col key={index} md={4} className="mb-4">
              <Card className="product product-card">
                {user.image && (
                  <Card.Img 
                    variant="top"  
                    src={user.image} 
                    alt={user.name || user.firstName}  
                    style={{ width: "150px", height: "150px" }} 
                  />
                )}
                <Card.Body>
                  <Card.Title><b>{user.name || `${user.firstName} ${user.lastName}`}</b></Card.Title>
                  {user.description && <Card.Text>{user.description}</Card.Text>}
                  <Card.Text><b>Name:</b> {user.firstName} {user.lastName}</Card.Text>
                  <Card.Text><b>E-mail:</b> {user.email}</Card.Text>
                  <div className="split">
                    <Button
                      variant="primary"
                      onClick={() => handleAddToCart(user)}
                      className="me-2">
                      Select Cart
                    </Button>
                    <Button variant="outline-primary" onClick={() => handleAddToFavorites(user)}>
                      Shortlist
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card className="p-4 border">
            <Contact />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
