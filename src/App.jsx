import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ModelPage from "./pages/ModelPage";
import Footer from "./components/Footer";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/brand/:brandId" element={<ModelPage />} />
        <Route
          path="/brand/:brandId/model/:modelId"
          element={<DetailsPage />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
