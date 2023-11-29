import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tutorial from "./pages/Tutorial";
import Settings from "./pages/Settings";
import Work from "./pages/Work";
import Study from "./pages/Study";
import Fun from "./pages/Fun";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Dashboard />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/tutorial" element={<Tutorial />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/work" element={<Work />} />
      <Route path="/study" element={<Study />} />
      <Route path="/fun" element={<Fun />} />
    </Routes>
  );
}

export default App;
