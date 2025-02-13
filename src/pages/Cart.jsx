import { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "notistack";
import { Container, ListGroup, Button, Alert } from "react-bootstrap";

function Cart() {
  const { user, cart = [], addToCart } = useAuth(); // ✅ Default to empty array
  const { enqueueSnackbar } = useSnackbar();
  const { users, removeFromCart } = useAuth(); 

  const removeCart = (userId) => {
    const updatedCart = cart.filter((item) => item.id !== userId);
    // Update the cart in context (you may need to implement this function)
    enqueueSnackbar("Item removed from cart", { variant: "success" });
  };

  return (
    <Container>
      <h1 className="my-4">Selected Carts</h1>
      {user ? (
        <>
          {cart.length === 0 ? (
            <Alert variant="info">Your cart is empty.</Alert>
          ) : (
            <ListGroup>
              {cart.map((item) => (
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

                  <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </>
      ) : (
        <Alert variant="warning">Please login to view your Selected Carts.</Alert>
      )}
    </Container>
  );
}

export default Cart;