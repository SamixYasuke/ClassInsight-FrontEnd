// LevelDepartmentForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LevelDepartmentForm = () => {
  const navigate = useNavigate();
  const [levels] = useState([100, 200, 300, 400, 500, 600]);
  const [departments, setDepartments] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Fetch departments based on the selected university (from MatricUniversityForm)
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `/university/universities/${selectedUniversity}/departments`
        );
        setDepartments(response.data.departments);
      } catch (error) {
        console.error(error);
      }
    };

    // Assuming you have a state for selectedUniversity from MatricUniversityForm
    fetchDepartments();
  }, [selectedUniversity]);

  const handleRegister = () => {
    // Validate selected level and department
    if (selectedLevel && selectedDepartment) {
      // Perform registration logic (e.g., send data to the server)
      alert("Registration Successful!");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div>
      <h3>Part 2: Level and Department</h3>
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

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default LevelDepartmentForm;
