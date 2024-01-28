import React from "react";
import PieChart from "./PieChart";

import universityFormStyles from "../assets/css/university-form.module.css";
import menuBtn from "../assets/images/hamburgerBtn.png";
import paginateLeftImg from "../assets/images/paginate left active icon.png";
import paginateRightImg from "../assets/images/paginate right active icon.png";
import backBtn from "../assets/images/Back btn icon.png";

const FeedBackSectionUniversity = ({
  navigate,
  formData,
  createPieChartData,
  handlePaginate,
  handleToggleMenu,
}) => {
  return (
    <section className={universityFormStyles.universityFormContainer}>
      <div>
        <img
          src={backBtn}
          alt="backBtn"
          onClick={() => {
            navigate(-1);
          }}
        />
        <img src={menuBtn} alt="menuBtn" onClick={handleToggleMenu} />
      </div>
      <div>
        {formData.dateRange.startDate && formData.dateRange.endDate && (
          <p>
            {new Date(formData.dateRange.startDate).toLocaleDateString(
              undefined,
              {
                day: "numeric",
                month: "short",
              }
            )}
            -
            {new Date(formData.dateRange.endDate).toLocaleDateString(
              undefined,
              {
                day: "numeric",
                month: "short",
              }
            )}
          </p>
        )}
      </div>
      <div>
        {createPieChartData().map((chartData, index) => (
          <div key={index}>
            <PieChart chartData={chartData} aspect={chartData.aspect} />
          </div>
        ))}
      </div>
      <div>
        {formData?.evaluationFeedbacks.map((feedback) => (
          <div
            key={feedback._id}
            onClick={() => {
              navigate(`/university/form/student-review/${feedback._id}`);
            }}
          >
            <div>
              <p>{feedback.matriculationNumber}</p>
              <p>
                {feedback.createdAt &&
                  `SUBMITTED:${new Date(feedback.createdAt).toLocaleString()}`}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <p onClick={() => handlePaginate(1)}>First</p>
        <button
          onClick={() => handlePaginate(formData.currentPage - 1)}
          disabled={formData.currentPage === 1}
        >
          <img src={paginateLeftImg} alt="paginateLeftImg" />
        </button>
        <p>{formData.currentPage && `Page ${formData.currentPage}`}</p>
        <button
          onClick={() => handlePaginate(formData.currentPage + 1)}
          disabled={formData.currentPage === formData.totalPages}
        >
          <img src={paginateRightImg} alt="paginateRightImg" />
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
  );
};

export default FeedBackSectionUniversity;
