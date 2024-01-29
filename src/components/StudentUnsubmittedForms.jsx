import React from "react";
import { useNavigate } from "react-router-dom";

import LoadingFormSpinner from "./LoadingFormSpinner";
import ErrorGettingForms from "./ErrorGettingForms";

const StudentUnsubmittedForms = ({
  formData,
  isFetchingForms,
  unExpectedError,
  fetchData,
}) => {
  const { unsubmittedForms } = formData;
  const navigate = useNavigate();

  if (unExpectedError) {
    return (
      <section>
        <ErrorGettingForms getFeedbackForms={fetchData} />
      </section>
    );
  }
  if (formData.length === 0) {
    return <p style={{ textAlign: "center" }}>No Form Found</p>;
  }

  return (
    <>
      {unsubmittedForms?.map((form) => (
        <div
          key={form?._id}
          onClick={() => {
            navigate(`/student/submit-review/${form?._id}`);
          }}
        >
          <p>{form?.courseCode}</p>
          <p>{form?.lecturerName}</p>
          <p>
            {form?.numberOfSubmissions <= 1
              ? `${form?.numberOfSubmissions} Submission`
              : `${form?.numberOfSubmissions} Submissions`}
          </p>
        </div>
      ))}
    </>
  );
};

export default StudentUnsubmittedForms;
