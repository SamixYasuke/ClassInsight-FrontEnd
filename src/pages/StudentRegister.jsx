import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import baseUrl from "../utilities/baseUrl";
import LoadingFormSpinner from "../components/LoadingFormSpinner";
import LoadingModal from "../components/LoadingModal";
import studentRegisterStyles from "../assets/css/student-register.module.css";
import backBtnIcon from "../assets/images/Back btn icon.png";

const StudentRegister = () => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, user, loginWithRedirect } = useAuth0();
  const [isGettingData, setIsGettingData] = useState(false);
  const [isGettingDepartments, setIsGettingDepartments] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [levels] = useState([100, 200, 300, 400, 500, 600]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [universityIsRegistering, setUniversityIsRegistering] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchUniversities();
    }
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (selectedUniversity) {
      fetchDepartments();
    }
  }, [selectedUniversity]);

  const fetchUniversities = async () => {
    setIsGettingData(true);
    try {
      const response = await axios.get(`${baseUrl}/university/universities`);
      setUniversities(response.data.universities);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGettingData(false);
    }
  };

  const fetchDepartments = async () => {
    setIsGettingDepartments(true);
    try {
      const response = await axios.get(
        `${baseUrl}/university/universities/${selectedUniversity}/departments`
      );
      setDepartments(response.data.departments);
    } catch (error) {
      console.error(error);
      toast.error("Couldn't get departments");
    } finally {
      setIsGettingDepartments(false);
    }
  };

  if (isLoading || isGettingData) {
    return (
      <div
        className={studentRegisterStyles.studentRegisterLoadingSpinnerContainer}
      >
        <LoadingFormSpinner />
      </div>
    );
  }

  const handleRegisterStudent = async () => {
    setUniversityIsRegistering(true);
    try {
      const response = await axios.post(`${baseUrl}/student/register`, {
        matriculationNumber: matricNumber,
        universityId: selectedUniversity,
        name: name,
        level: selectedLevel,
        email: email,
        department: selectedDepartment,
        authId: user?.sub,
      });
      if (response.status === 201) {
        toast.success("Registered Successfully");
        navigate("/student/home");
      } else {
        toast.error("An error occurred while registering student");
      }
      setUniversityIsRegistering(false);
    } catch (error) {
      setUniversityIsRegistering(false);
      console.error(error);
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 409) {
          toast.error("User already exists with the provided details");
          navigate("/");
        } else if (statusCode === 404) {
          toast.error(
            "Authentication ID is already associated with a University"
          );
          navigate("/");
        } else {
          toast.error("An error occurred while registering student");
        }
      } else {
        toast.error("An error occurred while registering student");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      matricNumber &&
      selectedUniversity &&
      selectedLevel &&
      selectedDepartment
    ) {
      handleRegisterStudent();
    } else {
      toast.warn("Complete All Fields");
    }
  };

  return (
    <>
      <div className={studentRegisterStyles.backBtnIconContainer}>
        <img
          src={backBtnIcon}
          alt="backBtnIcon"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <section className={studentRegisterStyles.studentRegisterContainer}>
        {user?.sub && <p>Student Id: {user?.sub}</p>}
        <h3>Student Registration</h3>
        <form className={studentRegisterStyles.studentRegisterFormContainer}>
          <div>
            <label htmlFor="name">Enter Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="matricNumber">Matriculation Number:</label>
            <input
              type="text"
              id="matricNumber"
              value={matricNumber}
              onChange={(e) => setMatricNumber(e.target.value)}
              placeholder="vug/csc/17/2045"
            />
          </div>
          <div>
            <label htmlFor="email">Enter Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="university">University:</label>
            <select
              id="university"
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
            >
              <option value="">Select University</option>
              {universities.map((university) => (
                <option key={university._id} value={university._id}>
                  {university.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="level">Level:</label>
            <select
              id="level"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="">Select Level</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          {departments.length >= 1 && (
            <div>
              <label htmlFor="department">Department:</label>
              <select
                id="department"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div
            className={studentRegisterStyles.studentRegisterSubmitBtnContainer}
          >
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </section>
      {universityIsRegistering && <LoadingFormSpinner />}
      {isGettingDepartments && <LoadingModal />}
    </>
  );
};

export default StudentRegister;
