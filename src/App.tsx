import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AboutPage   from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import SkillsPage  from "./pages/SkillsPage";
import CertificatesPage from "./pages/CertificatesPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/Homepage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"             element={<HomePage />} />
        <Route path="/about"        element={<AboutPage />} />
        <Route path="/projects"     element={<ProjectsPage />} />
        <Route path="/skills"       element={<SkillsPage />} />
        <Route path="/certificates" element={<CertificatesPage />} />
        <Route path="/contact"      element={<ContactPage />} />
      </Route>
    </Routes>
  );
}

export default App;