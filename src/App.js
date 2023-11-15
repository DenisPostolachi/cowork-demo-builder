import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Builder from "./components/builder/Builder";


const App = () => {
  return (
    <Routes>
      <Route element={<Builder />} path="/" />
    </Routes>
  );
};

export default App;
