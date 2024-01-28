import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import editModalFormStyle from "../assets/css/edit-form-modal.module.css";
import exitModalBtn from "../assets/images/Exit btn icon.png";
import baseUrl from "../utilities/baseUrl";
import LoadingFormSpinner from "./LoadingFormSpinner";

const EditFormModal = ({
  handleToggleEditModal,
  selectedFormId,
  getFeedbackForms,
}) => {
  const [formData, setFormData] = useState({
    courseCode: "",
    lecturerName: "",
    level: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth0();

  const handleGetFormData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/university/feedback-form/${selectedFormId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.sub}`,
          },
        }
      );
      const { data } = response;
      setFormData({
        courseCode: data.formDetails.courseCode,
        lecturerName: data.formDetails.lecturerName,
        level: data.formDetails.level,
        department: data.formDetails.department,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Error fetching form data");
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetFormData();
  }, [selectedFormId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditForm = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${baseUrl}/university/update-form/${selectedFormId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.sub}`,
          },
        }
      );
      console.log(response.data.message);
      toast(response?.data?.message || "Form Edited Successfully");
      handleToggleEditModal();
      getFeedbackForms();
    } catch (error) {
      console.log(error);
      setError("Error updating form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={editModalFormStyle.EditFormModalContainer}>
      <form className={editModalFormStyle.EditFormModalForm}>
        <div>
          <img
            src={exitModalBtn}
            alt="exitModalBtn"
            onClick={handleToggleEditModal}
          />
        </div>
        {loading ? (
          <section className={editModalFormStyle.editModalFormLoadingDiv}>
            <LoadingFormSpinner />
          </section>
        ) : error ? (
          <section className={editModalFormStyle.editModalFormErrorDiv}>
            <p>{error}</p>
          </section>
        ) : (
          <>
            <input
              type="text"
              name="courseCode"
              placeholder="Edit Course Code"
              value={formData.courseCode}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lecturerName"
              placeholder="Edit Lecturer's Name"
              value={formData.lecturerName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="level"
              placeholder="Edit Level"
              value={formData.level}
              onChange={handleChange}
            />
            <input
              type="text"
              name="department"
              placeholder="Edit Department"
              value={formData.department}
              onChange={handleChange}
            />
            <button type="button" onClick={handleEditForm}>
              Edit Form
            </button>
          </>
        )}
      </form>
    </section>
  );
};

export default EditFormModal;
