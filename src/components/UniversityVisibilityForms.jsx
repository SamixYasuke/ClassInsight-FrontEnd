import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import visibleIcon from "../assets/images/visible.png";
import notVisibleImg from "../assets/images/not visible.png";
import baseUrl from "../utilities/baseUrl";
import LoadingModal from "../components/LoadingModal";

const UniversityVisibilityForms = ({
  feedbackForms,
  handlePaginate,
  paginateLeftActiveBtn,
  paginateRightActiveBtn,
  getFeedbackForms,
}) => {
  const { user } = useAuth0();
  const [isToggling, setIsToggling] = useState(false);

  const toggleVisibility = async (formId) => {
    setIsToggling(true);
    try {
      const response = await axios.put(
        `${baseUrl}/university/toggle-visibility/${formId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.sub}`,
          },
        }
      );
      console.log(response.data.message);
      getFeedbackForms();
      toast(response?.data?.message || "Visibility toggled successfully");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while toggling visibility");
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <>
      {feedbackForms.dateRange && (
        <div>
          <p>
            {new Date(feedbackForms.dateRange.startDate).toLocaleString(
              undefined,
              {
                day: "numeric",
                month: "short",
              }
            )}
            -
            {new Date(feedbackForms.dateRange.endDate).toLocaleString(
              undefined,
              {
                day: "numeric",
                month: "short",
              }
            )}
          </p>
        </div>
      )}
      <div>
        {feedbackForms.forms && feedbackForms.forms.length > 0 ? (
          feedbackForms.forms.map((form) => (
            <div key={form._id} style={{ cursor: "default" }}>
              <p>{form.courseCode}</p>
              <p>{form.lecturerName}</p>
              <p>{new Date(form.createdAt).toLocaleDateString()}</p>
              {form.formIsActive ? (
                <img
                  src={visibleIcon}
                  alt="visibleIcon"
                  style={{ width: "30px", height: "30px", cursor: "pointer" }}
                  onClick={() => {
                    toggleVisibility(form?._id);
                  }}
                />
              ) : (
                <img
                  src={notVisibleImg}
                  alt="notVisibleImg"
                  style={{ width: "30px", height: "30px", cursor: "pointer" }}
                  onClick={() => {
                    toggleVisibility(form?._id);
                  }}
                />
              )}
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", margin: "150px 0" }}>
            No feedback forms available.
          </p>
        )}
      </div>
      <div>
        <p onClick={() => handlePaginate(1)}>First</p>
        <button
          onClick={() => handlePaginate(feedbackForms.currentPage - 1)}
          disabled={feedbackForms.currentPage === 1}
        >
          <img src={paginateLeftActiveBtn} alt="paginateLeftActiveBtn" />
        </button>
        <p>Page {feedbackForms.currentPage}</p>
        <button
          onClick={() => handlePaginate(feedbackForms.currentPage + 1)}
          disabled={feedbackForms.currentPage === feedbackForms.totalPages}
        >
          <img src={paginateRightActiveBtn} alt="paginateRightActiveBtn" />
        </button>
        <p
          onClick={() => {
            handlePaginate(feedbackForms.totalPages);
          }}
        >
          Last
        </p>
      </div>
      {isToggling && <LoadingModal />}
    </>
  );
};

export default UniversityVisibilityForms;
