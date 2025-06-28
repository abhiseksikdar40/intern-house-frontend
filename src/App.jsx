import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './index.css';
import Header from "./components/Header";
import Joblistings from "./pages/Joblistings";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
