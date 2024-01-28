import React from "react";
import { useNavigate } from "react-router-dom";

const UniversityAllForms = ({
  feedbackForms,
  handlePaginate,
  paginateLeftActiveBtn,
  paginateRightActiveBtn,
}) => {
  const navigate = useNavigate();

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
            <div
              key={form._id}
              onClick={() => {
                navigate(`/university/form/${form?._id}`);
              }}
            >
              <p>{form.courseCode}</p>
              <p>{form.lecturerName}</p>
              <p>{new Date(form.createdAt).toLocaleDateString()}</p>
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
    </>
  );
};

export default UniversityAllForms;
