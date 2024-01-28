import React from "react";

import loadingFormStyles from "../assets/css/loading-form-spinner.module.css";
import ReviewLoading from "./ReviewLoading";

const LoadingFormSpinner = () => {
  return (
    <div className={loadingFormStyles.LoadingFormSpinnerContainer}>
      <ReviewLoading />
    </div>
  );
};

export default LoadingFormSpinner;
