import React from "react";

import LoadingFormSpinner from "./LoadingFormSpinner";
import ErrorGettingForms from "./ErrorGettingForms";

const StudentSubmittedForms = ({
  formData,
  isFetchingForms,
  unExpectedError,
  fetchData,
}) => {
  const { submittedForms } = formData;

  if (unExpectedError) {
    return (
      <section>
        <ErrorGettingForms getFeedbackForms={fetchData} />
      </section>
    );
  }

  if (formData.length === 0) {
    return (
      <p style={{ textAlign: "center" }}>You havn't submitted any form yet</p>
    );
  }

  return (
    <>
      {submittedForms?.map((form) => (
        <div style={{ cursor: "default" }} key={form?._id}>
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

export default StudentSubmittedForms;
