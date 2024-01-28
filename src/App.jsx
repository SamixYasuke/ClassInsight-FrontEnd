import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UniversityHome from "./pages/UniversityHome";
import StudentHome from "./pages/StudentHome";
import Home from "./pages/Home";
import UniversityRegister from "./pages/UniversityRegister";
import StudentRegister from "./pages/StudentRegister";
import UniversityForm from "./components/UniversityForm";
import StudentFeedbackDetail from "./pages/StudentFeedbackDetail";
import CreateForm from "./pages/CreateForm";
import SubmitReviewForm from "./pages/SubmitReviewForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/university">
          <Route path="home" element={<UniversityHome />} />
          <Route path="register" element={<UniversityRegister />} />
          <Route path="form/:formId" element={<UniversityForm />} />
          <Route
            path="form/student-review/:studentReviewId"
            element={<StudentFeedbackDetail />}
          />
          <Route path="form/create-form" element={<CreateForm />} />
        </Route>
        <Route path="/student">
          <Route path="home" element={<StudentHome />} />
          <Route path="register" element={<StudentRegister />} />
          <Route path="submit-review/:formId" element={<SubmitReviewForm />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
