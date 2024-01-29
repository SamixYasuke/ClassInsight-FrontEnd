import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import baseUrl from "../utilities/baseUrl";
import studentFeedbackStyles from "../assets/css/student-feedback-detail.module.css";
import backBtn from "../assets/images/Back btn icon.png";
import menuBtn from "../assets/images/hamburgerBtn.png";
import LoadingFormSpinner from "../components/LoadingFormSpinner";
import ErrorGettingForms from "../components/ErrorGettingForms";
import MenuModal from "../components/MenuModal";

const StudentFeedbackDetail = () => {
  const { studentReviewId } = useParams();
  const { isLoading, isAuthenticated, user, loginWithRedirect } = useAuth0();
  const [studentReviewData, setStudentReviewData] = useState({});
  const [isgettingData, setIsGettingData] = useState(false);
  const [errorgettingData, setErrorgettingData] = useState(false);
  const [studentReviewNotFound, setStudentReviewNotFound] = useState(false);
  const [menuIsOpen, setModalisOpen] = useState(false);

  const navigate = useNavigate();

  const getStudentReviewData = async () => {
    setIsGettingData(true);
    setErrorgettingData(false);
    try {
      const response = await axios.get(
        `${baseUrl}/university/student-feedback/${studentReviewId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.sub}`,
          },
        }
      );
      const { data } = response;
      console.log(data);
      setStudentReviewData(data);
      setIsGettingData(false);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        console.log("404 Error: Resource not found");
        setStudentReviewNotFound(true);
        return;
      }
      setIsGettingData(false);
      setErrorgettingData(true);
    }
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
      return;
    }
    if (!isLoading && isAuthenticated) {
      getStudentReviewData();
    }
  }, [isLoading, isAuthenticated, studentReviewId]);

  const handleToggleMenu = () => {
    setModalisOpen((prev) => !prev);
  };

  if (isLoading || isgettingData) {
    return (
      <div className={studentFeedbackStyles.studentFeedbackSpinnerContainer}>
        <LoadingFormSpinner />
      </div>
    );
  }

  if (errorgettingData) {
    return <ErrorGettingForms getFeedbackForms={getStudentReviewData} />;
  }

  if (studentReviewNotFound) {
    return <p>Student feedback not found.</p>;
  }

  return (
    <>
      <section className={studentFeedbackStyles.studentFeedbackContainer}>
        <div className={studentFeedbackStyles.studentFeedbackDiv1}>
          <p>What did the student say?</p>
        </div>
        <div className={studentFeedbackStyles.studentFeedbackDiv2}>
          <div>
            <img
              src={backBtn}
              alt="backBtn"
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
          <div className={studentFeedbackStyles.shadowBox}>
            <div className={studentFeedbackStyles.innerBox}>
              <div className={studentFeedbackStyles.innerContent}>
                {studentReviewData.studentFeedback?.evaluationComment && (
                  <p>{studentReviewData.studentFeedback.evaluationComment}</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <img src={menuBtn} alt="menuBtn" onClick={handleToggleMenu} />
          </div>
        </div>
        <div className={studentFeedbackStyles.studentFeedbackDiv3}>
          <div>
            {studentReviewData.studentFeedback?.matriculationNumber && (
              <p>{studentReviewData.studentFeedback.matriculationNumber}</p>
            )}
          </div>
          <div>
            {studentReviewData.studentFeedback?.evaluationAspect?.aspects &&
              Object.entries(
                studentReviewData.studentFeedback.evaluationAspect.aspects
              ).map(([aspect, value]) => (
                <div key={aspect}>
                  <p>{aspect}</p>
                  <p
                    className={
                      value === "positive"
                        ? studentFeedbackStyles.positiveAspect
                        : value === "negative"
                        ? studentFeedbackStyles.negativeAspect
                        : studentFeedbackStyles.neutralAspect
                    }
                  >
                    {value}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <div className={studentFeedbackStyles.studentFeedbackDiv4}>
          {studentReviewData.studentFeedback?.createdAt && (
            <p>
              {new Date(
                studentReviewData.studentFeedback.createdAt
              ).toLocaleString()}
            </p>
          )}
        </div>
      </section>
      {menuIsOpen && <MenuModal handleToggleMenu={handleToggleMenu} />}
    </>
  );
};

export default StudentFeedbackDetail;
