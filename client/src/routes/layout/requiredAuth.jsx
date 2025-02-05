import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
function RequiredAuth() {
    const { currentUser } = useContext(AuthContext);
  
    return !currentUser ? (
      <Navigate to="/login" />
    ) : (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }

export default RequiredAuth;