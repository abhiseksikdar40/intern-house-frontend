import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Joblistings from './pages/Joblistings';
import Jobdetails from './pages/Jobdetails';
import Jobpost from './pages/Jobpost';
import { JobProvider } from './context/JobsContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <JobProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Joblistings />} />
          <Route path='joblistings' element={<Joblistings />} />
          <Route path='joblistings/:id' element={<Jobdetails />} />
          <Route path='postjob' element={<Jobpost />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </JobProvider>
  </StrictMode>
);
