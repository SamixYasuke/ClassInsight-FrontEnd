import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import checkUniversityAuth from "../utilities/checkUniversityAuth";
import universityHomeStyles from "../assets/css/university-home.module.css";
import hamburgerBtn from "../assets/images/hamburgerBtn.png";
import paginateLeftActiveBtn from "../assets/images/paginate left active icon.png";
import paginateRightActiveBtn from "../assets/images/paginate right active icon.png";
import baseUrl from "../utilities/baseUrl";
import UniversityAllForms from "../components/UniversityAllForms";
import UniversityVisibilityForms from "../components/UniversityVisibilityForms";
import UniversityUpdateDeleteForms from "../components/UniversityUpdateDeleteForms";
import ErrorGettingForms from "../components/ErrorGettingForms";
import LoadingFormSpinner from "../components/LoadingFormSpinner";
import MenuModal from "../components/MenuModal";

const UniversityHome = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, user, isLoading } = useAuth0();
  const [feedbackForms, setFeedbackForms] = useState({
    forms: [],
    dateRange: {},
    totalPages: 1,
    currentPage: 1,
  });
  const [formBtnState, setFormBtnState] = useState("ALL-FORMS");
  const [isGettingForm, setIsGettingForm] = useState(false);
  const [errorGettingForm, setErrorGettingForm] = useState(false);
  const [menuIsOpen, setModalisOpen] = useState(false);

  useEffect(() => {
    checkUniversityAuth(
      isLoading,
      user,
      loginWithRedirect,
      isAuthenticated,
      navigate,
      toast
    );
    getFeedbackForms();
  }, [
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    navigate,
    user,
    formBtnState,
  ]);

  const getFeedbackForms = async (page = 1) => {
    setIsGettingForm(true);
    setErrorGettingForm(false);
    try {
      const response = await axios.get(
        `${baseUrl}/university/all-feedback-forms`,
        {
          headers: {
            Authorization: `Bearer ${user?.sub}`,
          },
          params: {
            page,
          },
        }
      );
      setFeedbackForms(response.data || {});
      setIsGettingForm(false);
    } catch (error) {
      console.log(error);
      setIsGettingForm(false);
      setErrorGettingForm(true);
    }
  };

  const handlePaginate = (newPage) => {
    getFeedbackForms(newPage);
  };

  const handleFormBtnStateSwitch = (state) => {
    setFormBtnState(state);
  };

  const handleToggleMenu = () => {
    setModalisOpen((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div>
        <LoadingFormSpinner />
      </div>
    );
  }

  return (
    <>
      <main className={universityHomeStyles.universityHomeContainer}>
        <div>
          <button
            onClick={() => {
              handleFormBtnStateSwitch("ALL-FORMS");
            }}
            className={
              formBtnState === "ALL-FORMS"
                ? universityHomeStyles.formStateBtnDesign
                : ""
            }
          >
            All Forms
          </button>
          <button
            onClick={() => {
              handleFormBtnStateSwitch("VISIBILITY");
            }}
            className={
              formBtnState === "VISIBILITY"
                ? universityHomeStyles.formStateBtnDesign
                : ""
            }
          >
            Visibility Settings
          </button>
          <button
            onClick={() => {
              handleFormBtnStateSwitch("UPDATE-DELETE");
            }}
            className={
              formBtnState === "UPDATE-DELETE"
                ? universityHomeStyles.formStateBtnDesign
                : ""
            }
          >
            Update/Delete
          </button>
        </div>
        <div>
          <img
            src={hamburgerBtn}
            alt="hamburgerBtn"
            onClick={handleToggleMenu}
          />
        </div>
        {isGettingForm ? (
          <LoadingFormSpinner />
        ) : errorGettingForm ? (
          <ErrorGettingForms getFeedbackForms={getFeedbackForms} />
        ) : (
          <>
            {formBtnState === "ALL-FORMS" ? (
              <UniversityAllForms
                feedbackForms={feedbackForms}
                handlePaginate={handlePaginate}
                paginateLeftActiveBtn={paginateLeftActiveBtn}
                paginateRightActiveBtn={paginateRightActiveBtn}
              />
            ) : formBtnState === "VISIBILITY" ? (
              <UniversityVisibilityForms
                feedbackForms={feedbackForms}
                handlePaginate={handlePaginate}
                paginateLeftActiveBtn={paginateLeftActiveBtn}
                paginateRightActiveBtn={paginateRightActiveBtn}
                getFeedbackForms={getFeedbackForms}
              />
            ) : formBtnState === "UPDATE-DELETE" ? (
              <UniversityUpdateDeleteForms
                feedbackForms={feedbackForms}
                handlePaginate={handlePaginate}
                paginateLeftActiveBtn={paginateLeftActiveBtn}
                paginateRightActiveBtn={paginateRightActiveBtn}
                getFeedbackForms={getFeedbackForms}
              />
            ) : null}
          </>
        )}
      </main>
      {menuIsOpen && <MenuModal handleToggleMenu={handleToggleMenu} />}
    </>
  );
};

export default UniversityHome;
