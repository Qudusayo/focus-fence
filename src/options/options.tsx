import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tutorial from "./pages/Tutorial";
import Settings from "./pages/Settings";
import Work from "./pages/Work";
import Study from "./pages/Study";
import Fun from "./pages/Fun";
import { Toaster } from "react-hot-toast";

function Options() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="*" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/work" element={<Work />} />
          <Route path="/study" element={<Study />} />
          <Route path="/fun" element={<Fun />} />
        </Routes>
      </HashRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
            fontSize: "1rem",
          },

          // Default options for specific types
          success: {
            duration: 3000,
          },
        }}
      />
    </>
  );
}

export default Options;
