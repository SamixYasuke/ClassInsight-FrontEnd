import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import homeStyle from "../assets/css/home.module.css";
import RootImage from "../components/RootImage";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <main className={homeStyle.registerStyleMainContainer}>
      <h1>Class Insight</h1>
      <div>
        <RootImage />
      </div>
      <div>
        <p>Are you a </p>
        <button
          onClick={() => {
            navigate("/university/home");
          }}
        >
          University
        </button>
        <p>or a</p>
        <button
          onClick={() => {
            navigate("/student/home");
          }}
        >
          Student
        </button>
      </div>
    </main>
  );
};

export default Home;
