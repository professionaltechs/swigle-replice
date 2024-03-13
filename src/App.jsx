import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// PAGES
import Home from "./pages/Home";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:code" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
