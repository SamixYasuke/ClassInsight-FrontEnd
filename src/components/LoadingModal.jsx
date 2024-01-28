import React from "react";

import loadingModalStyle from "../assets/css/loading-modal.module.css";
import ReviewLoading from "./ReviewLoading";

const LoadingModal = () => {
  return (
    <div className={loadingModalStyle.loadingModalContainer}>
      <div>
        <ReviewLoading />
      </div>
    </div>
  );
};

export default LoadingModal;
