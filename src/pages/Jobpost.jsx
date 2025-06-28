import { useState } from "react";
import { useJobsContext } from "../context/JobsContext";

export default function Jobpost() {
  const { addJobs, jobAddToast, setJobAddToast } = useJobsContext();


  const [jobInput, setJobInput] = useState({
    jobtitle: "",
    companyname: "",
    location: "",
    salary: "",
    jobtype: "",
    jobdescription: "",
    jobqualification: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setJobInput((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addJobs(jobInput);

    setJobInput({
      jobtitle: "",
      companyname: "",
      location: "",
      salary: 0,
      jobtype: "",
      jobdescription: "",
      jobqualification: ""
    });
  };

  return (
    <div className="container-fluid py-1 px-5">
      <h1>Post a Job</h1>
      <form className="mt-2" onSubmit={handleSubmit}>
        <label htmlFor="jobtitle">Job Title:</label>
        <input
          className="form-control mt-1 mb-3"
          type="text"
          id="jobtitle"
          value={jobInput.jobtitle}
          onChange={handleChange}
          placeholder="e.g. Frontend Developer"
        />

        <label htmlFor="companyname">Company Name:</label>
        <input
          className="form-control mt-1 mb-3"
          type="text"
          id="companyname"
          value={jobInput.companyname}
          onChange={handleChange}
          placeholder="e.g. TechSpark Solutions"
        />

        <label htmlFor="location">Location:</label>
        <input
          className="form-control mt-1 mb-3"
          type="text"
          id="location"
          value={jobInput.location}
          onChange={handleChange}
          placeholder="e.g. Mumbai"
        />

        <label htmlFor="salary">Salary:</label>
        <input
          className="form-control mt-1 mb-3"
          type="number"
          id="salary"
          value={jobInput.salary}
          onChange={handleChange}
          placeholder="e.g. ₹8,00,000 per annum"
        />

        <label htmlFor="jobtype">Job Type:</label>
        <select
          className="form-select mt-1 mb-3"
          id="jobtype"
          value={jobInput.jobtype}
          onChange={handleChange}
        >
          <option value="">Select Job Type</option>
          <option value="Full-time (On-site)">Full-time (On-site)</option>
          <option value="Part-time (On-site)">Part-time (On-site)</option>
          <option value="Full-time (Remote)">Full-time (Remote)</option>
          <option value="Part-time (Remote)">Part-time (Remote)</option>
        </select>

        <label htmlFor="jobdescription">Job Description:</label>
        <textarea
          className="form-control mt-1 mb-3"
          id="jobdescription"
          value={jobInput.jobdescription}
          onChange={handleChange}
          placeholder="Briefly describe the role..."
        />

        <label htmlFor="jobqualification">Job Qualification:</label>
        <textarea
          className="form-control mt-1 mb-2"
          id="jobqualification"
          value={jobInput.jobqualification}
          onChange={handleChange}
          placeholder="Mention degrees, certifications, or skills required..."
        />

        <button type="submit" className="btn btn-primary mt-2">
          Post Job
        </button>
      </form>
      {jobAddToast && (
  <div
    className="toast-container position-fixed bottom-0 end-0 p-3"
    style={{ zIndex: 9999 }}
  >
    <div
      className="toast align-items-center text-white bg-success border-0 show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="d-flex">
        <div className="toast-body fw-bold">✅ Job posted successfully!</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          aria-label="Close"
          onClick={() => setJobAddToast(false)}
        ></button>
      </div>
    </div>
  </div>
)}
</div>
  );
}
