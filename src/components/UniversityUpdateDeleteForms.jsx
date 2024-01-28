import React, { useState } from "react";

import editIcon from "../assets/images/material-symbols_folder-managed-outline.svg";
import deleteIcon from "../assets/images/material-symbols_delete.svg";
import DeleteFormModal from "../components/DeleteFormModal";
import EditFormModal from "../components/EditFormModal";

const UniversityUpdateDeleteForms = ({
  feedbackForms,
  handlePaginate,
  paginateLeftActiveBtn,
  paginateRightActiveBtn,
  getFeedbackForms,
}) => {
  const [editFormModalIsOpen, setEditFormModalIsOpen] = useState(false);
  const [deleteFormModalIsOpen, setDeleteFormModalIsOpen] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState(null);

  const handleToggleEditModal = (formId) => {
    setEditFormModalIsOpen((prev) => !prev);
    setSelectedFormId(formId);
  };

  const handleToggleDeleteModal = (formId) => {
    setDeleteFormModalIsOpen((prev) => !prev);
    setSelectedFormId(formId);
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
              <div>
                <img
                  src={editIcon}
                  alt="editIcon"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleToggleEditModal(form?._id);
                  }}
                />
                <img
                  src={deleteIcon}
                  alt="deleteIcon"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleToggleDeleteModal(form?._id);
                  }}
                />
              </div>
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
      {editFormModalIsOpen && (
        <EditFormModal
          handleToggleEditModal={handleToggleEditModal}
          selectedFormId={selectedFormId}
          getFeedbackForms={getFeedbackForms}
        />
      )}
      {deleteFormModalIsOpen && (
        <DeleteFormModal
          getFeedbackForms={getFeedbackForms}
          selectedFormId={selectedFormId}
          handleToggleDeleteModal={handleToggleDeleteModal}
        />
      )}
    </>
  );
};

export default UniversityUpdateDeleteForms;
