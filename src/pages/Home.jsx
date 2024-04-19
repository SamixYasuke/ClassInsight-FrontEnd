import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import homeStyle from "../assets/css/home.module.css";
import RootImage from "../components/RootImage";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithPopup, isLoading } = useAuth0();

  const handleAuthentication = async (destination) => {
    try {
      await loginWithPopup();
      navigate(`/${destination}/home`);
    } catch (error) {
      toast.error("Authentication Failed");
    }
  };

  const redirectTo = (destination) => {
    if (isAuthenticated && !isLoading) {
      navigate(`/${destination}/home`);
    } else if (!isAuthenticated && !isLoading) {
      handleAuthentication(destination);
    }
  };

  return (
    <main className={homeStyle.registerStyleMainContainer}>
      <h1>Class Insight</h1>
      <div>
        <RootImage />
      </div>
      <div>
        <button onClick={() => redirectTo("university")}>University</button>
        <button onClick={() => redirectTo("student")}>Student</button>
      </div>
    </main>
  );
};

export default Home;
