import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth0 } from "@auth0/auth0-react";

import submitReviewStyles from "../assets/css/submit-review-form.module.css";
import backBtn from "../assets/images/Back btn icon.png";
import menuBtn from "../assets/images/hamburgerBtn.png";
import baseUrl from "../utilities/baseUrl";
import LoadingFormSpinner from "../components/LoadingFormSpinner";
import LoadingModal from "../components/LoadingModal";
import StudentMenuModal from "../components/StudentMenuModal";

const SubmitReviewForm = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [evaluationComment, setEvaluationComment] = useState("");
  const { isAuthenticated, loginWithRedirect, user, isLoading } = useAuth0();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast("Login Session Expired Redirecting....");
      loginWithRedirect();
    }
  }, [navigate]);

  const handleSubmitCourseReview = (e) => {
    e.preventDefault();
    if (evaluationComment === "") {
      toast.warn("Can't Submit Empty Comment");
      return;
    }

    if (evaluationComment.length < 100) {
      toast.warn("Review Too Short");
      return;
    }

    if (!isLoading && isAuthenticated) {
      submitCourseReview();
    }
  };

  const submitCourseReview = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${baseUrl}/student/submit-review/${formId}`,
        {
          evaluationComment,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.sub}`,
          },
        }
      );
      toast("Review Submitted Successfully");
      console.log(response.data);
      setIsSubmitting(false);
      navigate("/student/home");
    } catch (error) {
      setIsSubmitting(false);
      if (error.response.status === 400) {
        toast.warn("You've already submitted a review for this form");
        return;
      }
      if (error.response.status === 404) {
        toast.warn("Course feedback form not found");
        return;
      }

      console.log(error);
    }
  };

  const handleToggleMenu = () => {
    setMenuIsOpen((prev) => !prev);
  };

  if (isLoading) {
    return <LoadingFormSpinner />;
  }

  return (
    <>
      <section className={submitReviewStyles.submitReviewStylesContainer}>
        <div>
          <button disabled={true}>Unsubmitted Forms</button>
          <button disabled={true}>Submitted Forms</button>
        </div>
        <div>
          <img
            src={backBtn}
            alt="backBtn"
            onClick={() => {
              navigate(-1);
            }}
          />
          <p>Tell us about your experience with the class</p>
          <img src={menuBtn} alt="menuBtn" onClick={handleToggleMenu} />
        </div>
        <form>
          <p>Student experience</p>
          <textarea
            placeholder="Include details that include details on 
assignments given, lecture venue, grading skills
and lecture quality that speaks on the lecturer’s 
teaching strength"
            onChange={(e) => {
              setEvaluationComment(e.target.value);
            }}
            value={evaluationComment}
          ></textarea>
          <div>
            <button onClick={handleSubmitCourseReview}>Submit Form</button>
          </div>
        </form>
      </section>
      {isSubmitting && <LoadingModal />}
      {menuIsOpen && <StudentMenuModal handleToggleMenu={handleToggleMenu} />}
    </>
  );
};

export default SubmitReviewForm;
