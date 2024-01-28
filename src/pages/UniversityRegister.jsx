import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LoadingFormSpinner from "../components/LoadingFormSpinner";
import universityRegisterStyle from "../assets/css/university-registration.module.css";
import isValidEmail from "../utilities/validateEmail";
import baseUrl from "../utilities/baseUrl";
import LoadingModal from "../components/LoadingModal";

const UniversityRegister = () => {
  const [universityName, setUniversityName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const { user, isLoading, error } = useAuth0();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted with data:", {
      name: universityName,
      email,
      location: address,
      departments,
      authId: user?.sub,
    });

    console.log(isValidEmail(email));
    if (universityName === "" || email === "" || address === "") {
      toast.warn("Complete all fields");
      return;
    }

    if (!isValidEmail(email)) {
      toast.warn("Email is Invalid");
      return;
    }

    if (departments.length === 0) {
      toast.warn("Include at least one department");
      return;
    }
    try {
      setIsRegistering(true);
      const response = await axios.post(`${baseUrl}/university/register`, {
        name: universityName,
        email,
        location: address,
        departments,
        authId: user?.sub,
      });
      toast("You've been registered successfully");
      setIsRegistering(false);
      navigate("/university/home");
    } catch (error) {
      setIsRegistering(false);
      console.error("Error registering university:", error);
      if (error.response) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes("authentication id")) {
          toast.error(
            "A university has been registered with this same authentication id"
          );
        } else if (errorMessage.includes("email address")) {
          toast.error(
            "A university has been registered with this same email address"
          );
        } else if (errorMessage.includes("associated with a student")) {
          toast.error(
            "The authentication id is already associated with a student"
          );
        } else {
          toast.error(errorMessage);
        }
      }
    }
  };
  const handleAddDepartment = () => {
    if (department) {
      setDepartments((prevDepartments) => [...prevDepartments, department]);
      setDepartment("");
    }
  };

  const handleRemoveDepartment = (index) => {
    setDepartments((prevDepartments) =>
      prevDepartments.filter((_, i) => i !== index)
    );
  };

  return (
    <section>
      {isLoading && (
        <div>
          <LoadingFormSpinner />
        </div>
      )}
      {error && <p>Error loading user data. Please try again.</p>}
      {!isLoading && !error && user && (
        <>
          <form className={universityRegisterStyle.UniversityRegisterationForm}>
            <p>{`University Id: ${user?.sub}`}</p>
            <h2>University Registration</h2>
            <input
              type="text"
              placeholder="University Name"
              value={universityName}
              onChange={(e) => setUniversityName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className={universityRegisterStyle.addDepartmentContainer}>
              <input
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
              <button type="button" onClick={handleAddDepartment}>
                Add Department
              </button>
            </div>
            {departments.length > 0 && (
              <div className={universityRegisterStyle.departmentsContainerDiv}>
                <p>Departments:</p>
                <div>
                  {departments.map((dep, index) => (
                    <div key={index}>
                      <p>{dep}</p>
                      <button
                        type="button"
                        onClick={() => handleRemoveDepartment(index)}
                      >
                        Remove
                      </button>
                      &nbsp;
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button type="submit" onClick={handleSubmit}>
              Register
            </button>
          </form>
        </>
      )}
      {isRegistering && <LoadingModal />}
    </section>
  );
};

export default UniversityRegister;
