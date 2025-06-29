import { useState } from "react";
import { useFetch, useJobsContext } from "../context/JobsContext";
import { Link } from "react-router-dom";

export default function Joblistings() {
  const { data, loading, error, refetch } = useFetch("https://intern-house-backend.vercel.app/v1/jobs");
  const { deletejob, deletetoast, setDeleteToast } = useJobsContext();
  const [searchTerm, setSearchTerm] = useState("");

  const search = searchTerm.toLowerCase();
  const filteredJobs = data
    ? data.filter((job) =>
        job.jobtitle && job.jobtitle.toLowerCase().includes(search)
      )
    : [];

  return (
    <div className="container-fluid py-2">
      {/* Search */}
      <div className="mb-1" style={{ maxWidth: "600px" }}>
        <input
          type="text"
          placeholder="Search by job title..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h2 className="mb-2">All Jobs</h2>

      {/* Loading */}
      {loading && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-success" role="status" />
          <span className="px-2">Loading...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-danger" role="alert">
          Failed to fetch job listings.
        </div>
      )}

      {/* No Results */}
      {!loading && filteredJobs.length === 0 && (
        <p>No jobs found matching your search.</p>
      )}

      {/* Jobs Grid */}
      <div className="row gx-4 gy-1">
        {!loading &&
          filteredJobs.map((job) => (
            <div
              className="col-md-4 mb-2 d-flex justify-content-center"
              key={job._id}
            >
              <div className="card shadow p-4 w-100 me-3">
                <div className="card-body">
                  <h5 className="card-title">{job.jobtitle}</h5>
                  <p className="card-text">
                    <strong>Company:</strong> {job.companyname}<br />
                    <strong>Location:</strong> {job.location}<br />
                    <strong>Job Type:</strong> {job.jobtype}
                  </p>
                  <div>
                    <Link
                      to={`/joblistings/${job._id}`}
                      className="btn btn-primary mb-2 me-2 px-5"
                    >
                      See Details
                    </Link>
                    <button
                      className="btn btn-danger px-5 mb-2"
                      onClick={() => deletejob(job._id, refetch)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Bootstrap Toast */}
      {deletetoast && (
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
              <div className="toast-body fw-bold">✅ Job deleted successfully!</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                aria-label="Close"
                onClick={() => setDeleteToast(false)} 
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
