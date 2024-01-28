import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

import reviewLoadingStyle from "../assets/css/review-loading.module.css";
import writingAnimationJson from "../utilities/Animation - 1705869038318.json";

const ReviewLoading = () => {
  const container = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: writingAnimationJson,
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <div
      className={reviewLoadingStyle.reviewLoadingContainer}
      ref={container}
    ></div>
  );
};

export default ReviewLoading;
