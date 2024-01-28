import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import checkStudentAuth from "../utilities/checkStudentAuth";
import StudentSubmittedForms from "../components/StudentSubmittedForms";
import StudentUnsubmittedForms from "../components/StudentUnsubmittedForms";
import studentHomeStyles from "../assets/css/student-home.module.css";
import menuBtn from "../assets/images/hamburgerBtn.png";
import paginateLeft from "../assets/images/paginate left active icon.png";
import paginateRight from "../assets/images/paginate right active icon.png";
import baseUrl from "../utilities/baseUrl";
import LoadingFormSpinner from "../components/LoadingFormSpinner";
import StudentMenuModal from "../components/StudentMenuModal";

const StudentHome = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, user, isLoading } = useAuth0();
  const [btnState, setBtnState] = useState("UNSUBMITTED");
  const [formData, setFormData] = useState({});
  const [isFetchingForms, setIsFetchingForms] = useState(false);
  const [unExpectedError, setUnexpectedError] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    checkStudentAuth(
      isLoading,
      user,
      loginWithRedirect,
      isAuthenticated,
      navigate,
      toast
    );

    if (!isLoading && isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, isLoading, navigate, user, btnState]);

  const fetchData = async (page = 1) => {
    setIsFetchingForms(true);
    setUnexpectedError(false);

    try {
      const response = await axios.get(
        `${baseUrl}/student/forms?status=${btnState.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${user?.sub}`,
          },
          params: {
            page,
          },
        }
      );

      if (response.status === 200) {
        setFormData(response.data);
        console.log(response.data);
      } else {
        console.error(`Unexpected status code: ${response.status}`);
        setUnexpectedError(true);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setFormData([]);
      } else {
        setUnexpectedError(true);
      }
    } finally {
      setIsFetchingForms(false);
    }
  };

  const handlePaginate = (newPage) => {
    fetchData(newPage);
  };

  const handleToggleMenu = () => {
    setMenuIsOpen((prev) => !prev);
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
      <section className={studentHomeStyles.studentHomeStylesContainer}>
        <div>
          <button
            onClick={() => {
              setBtnState("UNSUBMITTED");
            }}
            className={
              btnState === "UNSUBMITTED" && studentHomeStyles.submitBtnState
            }
          >
            Unsubmitted forms
          </button>
          <button
            onClick={() => {
              setBtnState("SUBMITTED");
            }}
            className={
              btnState === "SUBMITTED" && studentHomeStyles.submitBtnState
            }
          >
            Submitted Forms
          </button>
        </div>
        <div>
          <img src={menuBtn} alt="menuBtn" onClick={handleToggleMenu} />
          {user?.given_name && <p>Welcome Back {user?.given_name}</p>}
        </div>
        <div>
          {btnState === "UNSUBMITTED" && (
            <StudentUnsubmittedForms
              formData={formData}
              isFetchingForms={isFetchingForms}
              unExpectedError={unExpectedError}
              fetchData={fetchData}
            />
          )}
          {btnState === "SUBMITTED" && (
            <StudentSubmittedForms
              formData={formData}
              isFetchingForms={isFetchingForms}
              unExpectedError={unExpectedError}
              fetchData={fetchData}
            />
          )}
        </div>
        <div>
          <p
            onClick={() => {
              handlePaginate(1);
            }}
          >
            First
          </p>
          <button
            onClick={() => handlePaginate(formData.currentPage - 1)}
            disabled={formData.currentPage === 1}
          >
            <img src={paginateLeft} alt="paginateLeft" />
          </button>
          <p>Page {formData.currentPage}</p>
          <button
            onClick={() => handlePaginate(formData.currentPage + 1)}
            disabled={formData.currentPage === formData.totalPages}
          >
            <img src={paginateRight} alt="paginateRight" />
          </button>
          <p
            onClick={() => {
              handlePaginate(formData.totalPages);
            }}
          >
            Last
          </p>
        </div>
      </section>
      {menuIsOpen && <StudentMenuModal handleToggleMenu={handleToggleMenu} />}
    </>
  );
};

export default StudentHome;
