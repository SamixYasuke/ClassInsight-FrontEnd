import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import baseUrl from "../utilities/baseUrl";

const MatricUniversityForm = () => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, user } = useAuth0();
  const [universities, setUniversities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [levels] = useState([100, 200, 300, 400, 500, 600]);
  const [matricNumber, setMatricNumber] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchUniversities();
    }
  }, [isLoading, isAuthenticated, navigate]);

  const fetchUniversities = async () => {
    try {
      const response = await axios.get(`${baseUrl}/university/universities`);
      setUniversities(response.data.universities);
      console.log(response.data.universities);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/universities/${selectedUniversity}/departments`
      );
      setDepartments(response.data.universities);
      console.log(response.data.universities);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [selectedUniversity]);

  return (
    <div>
      <h3>Part 1: Matriculation Number and University</h3>
      <label htmlFor="matricNumber">Matriculation Number:</label>
      <input
        type="text"
        id="matricNumber"
        value={matricNumber}
        onChange={(e) => setMatricNumber(e.target.value)}
      />
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
      {departments && (
        <>
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
        </>
      )}
      <button>Submit</button>
    </div>
  );
};

export default MatricUniversityForm;
