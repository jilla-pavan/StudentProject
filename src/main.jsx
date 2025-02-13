import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SnackbarProvider } from "notistack";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./index.css"; // Import custom CSS
import { AuthProvider } from "./context/AuthContext"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
  </AuthProvider>
);