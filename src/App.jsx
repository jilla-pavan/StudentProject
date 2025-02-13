import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";

import { AuthProvider } from "./context/AuthContext";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
   
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Details/:id" element={<Details />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Favorites" element={<Favorites />} />
        
        </Routes>
      </Router>
    </AuthProvider>
    
    </SnackbarProvider>
  );
};

export default App;