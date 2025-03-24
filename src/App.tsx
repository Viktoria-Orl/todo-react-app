import React from "react";

import NavMenu from "./components/NavMenu.tsx";
import Statistic from "./pages/Statistic.tsx";
import Homepage from "./pages/Homepage.tsx";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/todo-react-app">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/statistics" element={<Statistic />} />
        </Routes>

        <NavMenu />
      </BrowserRouter>
    </div>
  );
}

export default App;
