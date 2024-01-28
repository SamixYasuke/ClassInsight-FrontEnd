import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import createFormStyles from "../assets/css/create-form.module.css";
import backBtn from "../assets/images/Back btn icon.png";
import menuBtn from "../assets/images/hamburgerBtn.png";
import MenuModal from "../components/MenuModal";
import baseUrl from "../utilities/baseUrl";
import LoadingModal from "../components/LoadingModal";
import LoadingFormSpinner from "../components/LoadingFormSpinner";

const CreateForm = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, isLoading, loginWithRedirect } = useAuth0();
  const [menuIsOpen, setModalisOpen] = useState(false);
  const [courseCode, setCourseCode] = useState("");
  const [lecturerName, setLecturerName] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState(100);
  const [isCreatingForm, setIsCreatingForm] = useState(false);
  const [isGettingDepartments, setIsGettingDepartments] = useState(false);
  const [departments, setDepartments] = useState([]);

  const handleToggleMenu = () => {
    setModalisOpen((prev) => !prev);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (
      courseCode === "" ||
      lecturerName === "" ||
      department === "" ||
      level === 0
    ) {
      toast.warn("Complete all fields");
      return;
    }

    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
      return;
    }

    if (!isLoading && isAuthenticated) {
      createForm();
    }
  };

  const createForm = async () => {
    setIsCreatingForm(true);
    try {
      const response = await axios.post(
        `${baseUrl}/university/create-form`,
        {
          courseCode,
          lecturerName,
          level,
          department,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.sub}`,
          },
        }
      );
      toast("Form Created Successfully");
      console.log(response.data);
      setIsCreatingForm(false);
      navigate("/university/home");
    } catch (error) {
      console.log("An Unexpected Error Occured, Coudn't CreateForm");
      toast.error("An Unexpected Error Occured, Coudn't CreateForm");
      setIsCreatingForm(false);
    }
  };

  const getDepartments = async () => {
    setIsGettingDepartments(true);
    try {
      const response = await axios.get(
        `${baseUrl}/university/universities/${user?.sub}/departments`
      );
      const { data } = response;
      console.log(data);
      setDepartments(data.departments);
    } catch (error) {
      console.log(error);
      toast.error("Couldn't get Departments please Refresh");
    } finally {
      setIsGettingDepartments(false);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      getDepartments();
    }
  }, [navigate, isLoading, isAuthenticated]);

  if (isLoading) {
    return <LoadingFormSpinner />;
  }

  if (isGettingDepartments) {
    return <LoadingModal />;
  }

  return (
    <>
      <section className={createFormStyles.createFormContainer}>
        <div>
          <img
            src={backBtn}
            alt="backBtn"
            onClick={() => {
              navigate(-1);
            }}
          />
          <img src={menuBtn} alt="menuBtn" onClick={handleToggleMenu} />
        </div>
        <form className={createFormStyles.createFormInputsContainer}>
          <div>
            <label htmlFor="courseCode">Course Code</label>
            <input
              type="text"
              id="courseCode"
              placeholder="CSC 123"
              onChange={(e) => {
                setCourseCode(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="lecturerName">lecturer Name</label>
            <input
              type="text"
              id="lecturerName"
              placeholder="Firstname MiddleName Lastname"
              onChange={(e) => {
                setLecturerName(e.target.value);
              }}
            />
          </div>
          <div>
            <select
              id="departments"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            >
              <option value="">Select Department</option>
              {departments.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <p>Select Level</p>
          <div className={createFormStyles.createFormLevelContainer}>
            <label htmlFor="100">
              <input
                type="radio"
                name="level"
                value={100}
                id="100"
                onChange={(e) => {
                  setLevel(Number(e.target.value));
                }}
                checked={level === 100}
              />
              100
            </label>
            <label htmlFor="200">
              <input
                type="radio"
                name="level"
                value={200}
                id="200"
                onChange={(e) => {
                  setLevel(Number(e.target.value));
                }}
                checked={level === 200}
              />
              200
            </label>
            <label htmlFor="300">
              <input
                type="radio"
                name="level"
                value={300}
                id="300"
                onChange={(e) => {
                  setLevel(Number(e.target.value));
                }}
                checked={level === 300}
              />
              300
            </label>
            <label htmlFor="400">
              <input
                type="radio"
                name="level"
                value={400}
                id="400"
                onChange={(e) => {
                  setLevel(Number(e.target.value));
                }}
                checked={level === 400}
              />
              400
            </label>
            <label htmlFor="500">
              <input
                type="radio"
                name="level"
                value={500}
                id="500"
                onChange={(e) => {
                  setLevel(Number(e.target.value));
                }}
                checked={level === 500}
              />
              500
            </label>
            <label htmlFor="600">
              <input
                type="radio"
                name="level"
                value={600}
                id="600"
                onChange={(e) => {
                  setLevel(Number(e.target.value));
                }}
                checked={level === 600}
              />
              600
            </label>
          </div>
          <div className={createFormStyles.createFormBtnContainer}>
            <button onClick={handleSubmitForm}>Create Form</button>
          </div>
        </form>
      </section>
      {menuIsOpen && <MenuModal handleToggleMenu={handleToggleMenu} />}
      {isCreatingForm && <LoadingModal />}
    </>
  );
};

export default CreateForm;
