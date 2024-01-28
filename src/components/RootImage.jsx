import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import rootImageStyle from "../assets/css/root-image.module.css";

import rootImageJson from "../utilities/Root Image.json";

const RootImage = () => {
  const container = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: rootImageJson,
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return <div className={rootImageStyle.rootContainer} ref={container}></div>;
};

export default RootImage;
