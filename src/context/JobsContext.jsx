import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const JobsContext = createContext();

// Custom Hook to use the Context
export const useJobsContext = () => useContext(JobsContext);

// Custom Data Fetch Hook
export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch data");
      const result = await res.json();
      setData(result || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};

// Context Provider
export function JobProvider({ children }) {
  const [deletetoast, setDeleteToast] = useState(false);
  const [jobAddToast, setJobAddToast] = useState(false)
  

  const deletejob = async (jobid, refetch) => {
    try {
      const response = await fetch(`https://intern-house-backend.vercel.app/v1/jobs/delete/${jobid}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed To Delete Job!");

      setDeleteToast(true);
    if (refetch) await refetch();
      setTimeout(() => setDeleteToast(false), 1000);
    } catch (err) {
      console.error(err.message);
    }
  };
 
  const addJobs = async (newJob) => {
  try {
    const response = await fetch('https://intern-house-backend.vercel.app/v1/jobs', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });

    if (!response.ok) throw new Error("Failed to add job!");

    const newJobs = await response.json();

    setJobAddToast(true);
    setTimeout(() => setJobAddToast(false), 1000);

    return newJobs;
  } catch (error) {
    console.log('Failed To Add Job!', error);
  }
};


  return (
    <JobsContext.Provider value={{ deletejob, deletetoast, setDeleteToast, addJobs, jobAddToast, setJobAddToast }}>
      {children}
    </JobsContext.Provider>
  );
}
