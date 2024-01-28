import React from "react";

import errorGettingFormsStyle from "../assets/css/error-getting-forms.module.css";

const ErrorGettingForms = ({ getFeedbackForms }) => {
  return (
    <div className={errorGettingFormsStyle.errorGettingFormsContainer}>
      <p>An unexpected error occurred &#128534;. Please try again.</p>
      <button onClick={() => getFeedbackForms()}>Try Again</button>
    </div>
  );
};

export default ErrorGettingForms;
