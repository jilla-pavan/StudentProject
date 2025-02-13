import { createContext, useContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext(null);

// ✅ Custom Hook for AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Login Function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    setCart([]);
    setFavorites([]);
    localStorage.removeItem("currentUser");
  };

  // Add to Cart
  const addToCart = (user) => {
    setCart((prevCart) => [...prevCart, user]);
  };

  // Remove from Cart (✅ Fix 'item' typo → 'user')
  const removeFromCart = (userId) => {
    setCart((prevCart) => prevCart.filter((user) => user.id !== userId));
  };

  // Add to Favorites
  const addToFavorites = (user) => {
    setFavorites((prevFavorites) => [...prevFavorites, user]);
  };

  // Remove from Favorites (✅ Fix 'item' typo → 'user')
  const removeFromFavorites = (userId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((user) => user.id !== userId)
    );
  };

  // Restore user session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Context Value
  const contextValue = {
    user,
    cart,
    favorites,
    login,
    logout,
    addToCart,
    removeFromCart,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ THIS IS THE CORRECT LAST LINE (No extra exports)
