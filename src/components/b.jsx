import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import universityFormStyles from "../../assets/css/university-form.module.css";
import backBtn from "../../assets/images/Back btn icon.png";
import menuBtn from "../../assets/images/hamburgerBtn.png";
import paginateLeftImg from "../../assets/images/paginate left active icon.png";
import paginateRightImg from "../../assets/images/paginate right active icon.png";
import baseUrl from "../../utilities/baseUrl";

const UniversityForm = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, user } = useAuth0();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      handleGetFormData();
    }
  }, [isLoading, isAuthenticated, formId]);

  const handleGetFormData = async (page = 1) => {
    try {
      const response = await axios.get(
        `${baseUrl}/university/evaluation-feedbacks/${formId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.sub}`,
          },
          params: {
            page,
          },
        }
      );
      const { data } = response;
      setFormData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePaginate = (newPage) => {
    handleGetFormData(newPage);
  };

  return (
    <>
      {formData && formData.dateRange && (
        <section className={universityFormStyles.universityFormContainer}>
          <div>
            <img
              src={backBtn}
              alt="backBtn"
              onClick={() => {
                navigate(-1);
              }}
            />
            <img src={menuBtn} alt="menuBtn" />
          </div>
          <div>
            {formData.dateRange.startDate && formData.dateRange.endDate && (
              <p>
                {new Date(formData.dateRange.startDate).toLocaleString(
                  undefined,
                  {
                    day: "numeric",
                    month: "short",
                  }
                )}
                -
                {new Date(formData.dateRange.endDate).toLocaleString(
                  undefined,
                  {
                    day: "numeric",
                    month: "short",
                  }
                )}
              </p>
            )}
          </div>
          <div>
            <div>graph1</div>
            <div>graph2</div>
            <div>graph3</div>
            <div>graph4</div>
            <div>graph5</div>
            <div>graph6</div>
            <div>graph7</div>
          </div>
          <div>
            {formData.evaluationFeedbacks.map((feedback) => (
              <div key={feedback._id}>
                <div>
                  <p>{feedback.matriculationNumber}</p>
                  <div>
                    {feedback.evaluationAspect &&
                      feedback.evaluationAspect.aspects &&
                      Object.entries(feedback.evaluationAspect.aspects).map(
                        ([aspect, value]) => (
                          <div key={aspect}>
                            <p>{aspect}</p>
                            <p>{value}</p>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p onClick={() => handlePaginate(1)}>First</p>
            <button
              onClick={() => handlePaginate(formData.currentPage - 1)}
              disabled={formData.currentPage === 1}
            >
              <img src={paginateLeftImg} alt="paginateLeftImg" />
            </button>
            <p>{formData.currentPage && `Page ${formData.currentPage}`}</p>
            <button
              onClick={() => handlePaginate(formData.currentPage + 1)}
              disabled={formData.currentPage === formData.totalPages}
            >
              <img src={paginateRightImg} alt="paginateRightImg" />
            </button>
            <p
              onClick={() => {
                handlePaginate(formData.totalPages);
              }}
            >
              Last
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default UniversityForm;

// import React from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const UniversityForm = () => {
//   const data = {
//     labels: ["One", "Two", "Three"],
//     datasets: [
//       {
//         data: [3, 6, 9],
//         backgroundColor: ["aqua", "orangered", "purple"],
//       },
//     ],
//   };

//   const options = {};
//   return (
//     <div>
//       <h1>Pie Chart</h1>
//       <div style={{ padding: "20px", width: "50%" }}>
//         <Pie data={data} options={options}></Pie>
//       </div>
//     </div>
//   );
// };

// export default UniversityForm;
