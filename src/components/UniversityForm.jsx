import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import baseUrl from "../utilities/baseUrl";
import FeedBackSectionUniversity from "../components/FeedBackSectionUniversity";
import LoadingFormSpinner from "./LoadingFormSpinner";
import {
  createPieChartData,
  getColorSchemeForAspect,
} from "../utilities/createPieChart";
import universityFormStyles from "../assets/css/university-form.module.css";
import backBtn from "../assets/images/Back btn icon.png";
import MenuModal from "./MenuModal";

ChartJS.register(ArcElement, Tooltip, Legend);

const UniversityForm = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, user, loginWithRedirect } = useAuth0();
  const [formData, setFormData] = useState({});
  const [isGettingFormData, setIsGettingFormData] = useState(false);
  const [unexpectedError, setUnexpectedError] = useState(false);
  const [notFoundError, setNotFoundError] = useState(false);
  const [menuIsOpen, setModalisOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
      return;
    }
    if (!isLoading && isAuthenticated) {
      handleGetFormData();
    }
  }, [isLoading, isAuthenticated, formId]);

  const handleGetFormData = async (page = 1) => {
    setIsGettingFormData(true);
    setUnexpectedError(false);
    setNotFoundError(false);
    try {
      const response = await axios.get(
        `${baseUrl}/university/evaluation-feedbacks/${formId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.sub}`,
          },
          params: {
            page,
          },
        }
      );
      const { data } = response;
      setFormData(data);
      setIsGettingFormData(false);
    } catch (error) {
      setIsGettingFormData(false);
      if (error.response) {
        if (error.response.status === 404) {
          setNotFoundError(true);
        } else {
          setUnexpectedError(true);
        }
      } else if (error.request) {
        console.error("No response received from the server.");
        setUnexpectedError(true);
      } else {
        console.error("Error during request setup:", error.message);
        setUnexpectedError(true);
      }
    }
  };

  const handlePaginate = (page) => {
    console.log("Paginating to page:", page);
    handleGetFormData(page);
  };

  const handleToggleMenu = () => {
    setModalisOpen((prev) => !prev);
  };

  if (isLoading || isGettingFormData) {
    return (
      <div className={universityFormStyles.spinnerContainer}>
        <LoadingFormSpinner />
      </div>
    );
  }

  if (notFoundError) {
    return (
      <div className={universityFormStyles.notFoundErrorContainer}>
        <p>No Feedback Found For This Form!!</p>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={backBtn} alt="backBtn" />
          <p>Go Back</p>
        </button>
      </div>
    );
  }

  if (unexpectedError) {
    return (
      <div className={universityFormStyles.unexpectedErrorContainer}>
        <p>An Unexpected Error Has Ocurred &#128534;</p>
        <button onClick={handleGetFormData}>Try Again</button>
      </div>
    );
  }

  return (
    <>
      {formData?.dateRange && (
        <FeedBackSectionUniversity
          navigate={navigate}
          formData={formData}
          createPieChartData={() =>
            createPieChartData(formData, getColorSchemeForAspect)
          }
          handlePaginate={handlePaginate}
          handleToggleMenu={handleToggleMenu}
        />
      )}
      {menuIsOpen && <MenuModal handleToggleMenu={handleToggleMenu} />}
    </>
  );
};

export default UniversityForm;
