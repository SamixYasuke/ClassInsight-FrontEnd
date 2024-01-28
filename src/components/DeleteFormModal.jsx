import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import deleteModalFormStyle from "../assets/css/delete-form-modal.module.css";
import baseUrl from "../utilities/baseUrl";

const DeleteFormModal = ({
  getFeedbackForms,
  selectedFormId,
  handleToggleDeleteModal,
}) => {
  const { user } = useAuth0();
  const [loading, setLoading] = useState(false);

  const handleDeleteForm = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${baseUrl}/university/delete-form/${selectedFormId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.sub}`,
          },
        }
      );
      console.log(response.data.message);
      toast(response?.data?.message || "Form Deleted Successfully");
      getFeedbackForms();
    } catch (error) {
      console.log(error);
      toast.error("Error deleting form");
    } finally {
      setLoading(false);
      handleToggleDeleteModal();
    }
  };

  return (
    <div className={deleteModalFormStyle.deleteFormModalContainer}>
      <div className={deleteModalFormStyle.deleteFormModalForm}>
        <p>Are You Sure You Want To Delete This Form?</p>
        <div>
          <button type="button" onClick={handleDeleteForm} disabled={loading}>
            Yes
          </button>
          <button
            type="button"
            onClick={handleToggleDeleteModal}
            disabled={loading}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFormModal;
