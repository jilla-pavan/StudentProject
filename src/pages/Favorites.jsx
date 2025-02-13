import { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "notistack";
import { Container, Alert, ListGroup, Button } from "react-bootstrap";

const Favorites = () => {
  const { user, Favorites = [], addToFavorites } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { favorites, removeFromFavorites } = useAuth(); 

  const removeFavorites = (usersId) => {
    const updatedFavorites = favorites.filter((item) => item.id !== usersId);
    addToFavorites(updatedFavorites);
    enqueueSnackbar("Item removed from favorites", { variant: "success" });
  };

  // ✅ Function to generate "mailto" link
  const sendEmail = (email, firstName) => {
    const subject = encodeURIComponent("We Are Impressed With Your Profile!");
    const body = encodeURIComponent(
      `Hello ${firstName},\n\nWe are impressed with your profile! \nWe hope you have a great day.\n\nBest regards,\nYour Company`
    );
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <Container>
      <h1 className="my-4">Shortlisted Profiles</h1>
      {user ? (
        <>
          {favorites.length === 0 ? (
            <Alert variant="info">Your favorites list is empty.</Alert>
          ) : (
            <ListGroup>
              {favorites.map((item) => (
                <ListGroup.Item key={item.id} >
                {item.image && (
                <img
                  src={item.image}
                  alt={`${item.firstName} ${item.lastName}`}
                  style={{ width: "200px", height: "200px", borderRadius: "50%", marginRight: "15px" }}
                   />
                )}
                  <div>
                <p><b>First Name:</b> {item.firstName}</p>
                <p><b>Last Name:</b> {item.lastName}</p>
                <p><b>Maiden Name:</b> {item.maidenName}</p>
                <p><b>Age:</b> {item.age}</p>
                <p><b>Gender:</b> {item.gender}</p>
                <p><b>Email:</b> {item.email}</p>
                <p><b>Username:</b> {item.username}</p>
                <p><b>Birth Date:</b> {item.birthDate}</p>
                <p><b>Blood Group:</b> {item.bloodGroup}</p>
                <p><b>Height:</b> {item.height} cm</p>
                <p><b>Weight:</b> {item.weight} kg</p>
                <p><b>Eye Color:</b> {item.eyeColor}</p>
                
                {/* Fix for hair object */}
                <p><b>Hair Type:</b> {item.hair?.type}</p>
                <p><b>Hair Color:</b> {item.hair?.color}</p>

                <div className="d-flex gap-2">
                  {/* ✅ Send Email Button */}
                  <Button 
                    variant="success" 
                    href={sendEmail(item.email, item.firstName)}
                  >
                    Send Email
                  </Button>

                  {/* ✅ Remove from Favorites Button */}
                  <Button 
                    variant="danger" 
                    onClick={() => removeFromFavorites(item.id)}
                  >
                    Remove
                  </Button>
                </div>

                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </>
      ) : (
        <Alert variant="warning">Please login to view your Shortlisted Profiles.</Alert>
      )}
    </Container>
  );
};

export default Favorites;
