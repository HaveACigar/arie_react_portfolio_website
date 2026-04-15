import ContactMe from "./components/contact/ContactMe";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MastersProjects from './components/mastersprojects/MastersProjects';
import Contact from "./components/contact/Contact";
import Intro from "./components/intro/Intro";
import Topbar from "./components/topbar/Topbar";
import AboutMe from "./components/aboutme/AboutMe";
import Skills from "./components/skills/Skills";
import Experience from "./components/experience/Experience";
import Education from "./components/education/Education";
import Projects from "./components/projects/Projects";
import Footer from "./components/footer/Footer";
import PortfolioWorks from "./components/PortfolioWorks";
import DataSciencePage from "./components/specialty/DataSciencePage";
import SoftwareEngineeringPage from "./components/specialty/SoftwareEngineeringPage";
import PersonalProjects from "./components/personalprojects/PersonalProjects";
import EDAProjectPage from "./components/personalprojects/EDAProjectPage";
import ChurnPredictionPage from "./components/personalprojects/ChurnPredictionPage";
import PersonalProjectDetailPage from "./components/personalprojects/PersonalProjectDetailPage";
import ReactPortfolioPage from "./components/personalprojects/ReactPortfolioPage";
import SchoolProjectPage from "./components/schoolprojects/SchoolProjectPage";
import "./app.scss";
import { useContext } from "react";
import { ThemeContext } from "./context";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function App() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div className="app" style={{
      color: darkMode ? "#f5f5f5" : "#222",
      background: darkMode
        ? "#222"
        : "linear-gradient(135deg, #f8fafc 0%, #e3f0ff 100%)",
      minHeight: '100vh',
      transition: 'background 0.4s',
    }}>
      <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}>
        <Router>
          <Routes>
          <Route path="/" element={
            <>
              <Topbar/>
              <div className="sections" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', position: 'relative', paddingTop: 80, paddingBottom: 0 }}>
                <Intro/>
                <AboutMe/>
                <Skills/>
                <Experience/>
                <Education/>
                <Projects/>
              </div>
              <Footer/>
            </>
          } />
          <Route path="/aboutme" element={
            <>
              <Topbar/>
              <AboutMe />
              <Footer/>
            </>
          } />
          <Route path="/portfolio" element={
            <>
              <Topbar/>
              <PortfolioWorks />
              <Footer/>
            </>
          } />
          <Route path="/contact" element={
            <>
              <Topbar/>
              <Contact />
              <Footer/>
            </>
          } />
          <Route path="/contactme" element={
            <>
              <Topbar/>
              <ContactMe />
              <Footer/>
            </>
          } />
          <Route path="/data-science" element={
            <>
              <Topbar/>
              <DataSciencePage />
              <Footer/>
            </>
          } />
          <Route path="/software-engineering" element={
            <>
              <Topbar/>
              <SoftwareEngineeringPage />
              <Footer/>
            </>
          } />
          <Route path="/mastersprojects" element={
            <>
              <MastersProjects />
              <Footer/>
            </>
          } />
          <Route path="/personal-projects" element={
            <>
              <Topbar/>
              <PersonalProjects />
              <Footer/>
            </>
          } />
          <Route path="/personal-projects/eda-visualization-dashboard" element={
            <>
              <Topbar/>
              <EDAProjectPage />
              <Footer/>
            </>
          } />
          <Route path="/personal-projects/react-portfolio-website" element={
            <>
              <Topbar/>
              <ReactPortfolioPage />
              <Footer/>
            </>
          } />
          <Route path="/personal-projects/supervised-ml-pipeline" element={
            <>
              <Topbar/>
              <ChurnPredictionPage />
              <Footer/>
            </>
          } />
          <Route path="/personal-projects/:projectId" element={
            <>
              <Topbar/>
              <PersonalProjectDetailPage />
              <Footer/>
            </>
          } />
          <Route path="/school-projects/:projectSlug" element={
            <>
              <Topbar/>
              <SchoolProjectPage />
              <Footer/>
            </>
          } />
          </Routes>
        </Router>
      </GoogleReCaptchaProvider>
    </div>
  );
}

export default App;