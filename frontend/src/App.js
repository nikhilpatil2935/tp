import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TerminalApology from "./components/TerminalApology";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TerminalApology />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;