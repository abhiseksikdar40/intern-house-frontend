import { useParams, Link } from "react-router-dom";
import { useFetch } from "../context/JobsContext";

export default function Jobdetails() {
  const { id } = useParams();
  const { data: jobs = [], loading, error } = useFetch("https://intern-house-backend.vercel.app/v1/jobs");

  const job = jobs.find((job) => job._id === id);



  if (loading) return <p className="text-center my-5">Loading job details...</p>;
  if (error) return <p className="text-danger text-center my-5">Failed to load job details.</p>;
  if (!job) return <p className="text-center my-5">Job not found.</p>;

  return (
    <div className="container py-4 px-4">
      <Link to="/joblistings" className="btn btn-outline-secondary mb-4">
        ← Back to Job Listings
      </Link>

        <h1>{job.jobtitle}</h1>
      <div className="card shadow-lg mt-3">
        <div className="card-body">
          <p className="mb-1"><strong>Company:</strong> {job.companyname}</p>
          <p className="mb-1"><strong>Location:</strong> {job.location}</p>
          <p className="mb-1"><strong>Job Type:</strong> {job.jobtype}</p>
          <p className="mb-1"><strong>Salary:</strong> ₹{job.salary.toLocaleString()}</p>
          <p className="mb-1"><strong>Job Description:</strong> {job.jobdescription}</p>
          <p className="mb-1"><strong>Job Qualifications:</strong></p>
          <ol>
            {job.jobqualification.split(", ").map((q, index) => (
              <li key={index}>{q.trim()}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
