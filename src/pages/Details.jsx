import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Loader from "../components/Loader";

const Details = () => {
  const { id } = useParams();
  const [users, setUsers] = useState(null); // Fixed state setter
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://csa-batch79-react.onrender.com/users/${id}`);
        setUsers(response.data); // Fixed setter function
        setLoading(false);
      } catch (error) {
        enqueueSnackbar("Failed to fetch user details", { variant: "error" });
        setLoading(false);
      }
    };
    fetchUsers();
  }, [id]);

  return (
    <div>
      <h1>Details</h1>
      {loading ? (
        <Loader />
      ) : users ? (
        <div>
          <h2>{users.firstName}</h2>
          <p>{users.lastName}</p>
        </div>
      ) : (
        <p>User not found.</p> // ✅ Handles undefined users gracefully
      )}
    </div>
  );
};

export default Details;
