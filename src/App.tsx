import React from "react";

import NavMenu from "./components/NavMenu.tsx";
import Statistic from "./pages/Statistic.tsx";
import Homepage from "./pages/Homepage.tsx";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* http://localhost:3000 */}
          <Route path="/statistics" element={<Statistic />} />
          {/* http://localhost:3000/statistics */}
        </Routes>

        <NavMenu />
      </BrowserRouter>
    </div>
  );
}

export default App;
