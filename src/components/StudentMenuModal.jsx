import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import menuModalStyles from "../assets/css/menu-modal.module.css";
import exitBtn from "../assets/images/Exit btn icon.png";

const StudentMenuModal = ({ handleToggleMenu }) => {
  const navigate = useNavigate();
  const { logout } = useAuth0();
  return (
    <section className={menuModalStyles.menuModalContainer}>
      <div className={menuModalStyles.menuModalDiv}>
        <div>
          <img src={exitBtn} alt="exitBtn" onClick={handleToggleMenu} />
        </div>
        <div>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        </div>
      </div>
    </section>
  );
};

export default StudentMenuModal;
