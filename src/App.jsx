import ContactMe from "./components/contact/ContactMe";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ChatAssistantPage from "./components/chat/ChatAssistantPage";
import MastersProjects from './components/mastersprojects/MastersProjects';
import Contact from "./components/contact/Contact";
import Intro from "./components/intro/Intro";
import Topbar from "./components/topbar/Topbar";
import AboutMe from "./components/aboutme/AboutMe";
import Skills from "./components/skills/Skills";
import FeaturedProject from "./components/featuredproject/FeaturedProject";
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
import RagOpsPlatformPage from "./components/personalprojects/RagOpsPlatformPage";
import SnowflakeFinanceAIPage from "./components/personalprojects/SnowflakeFinanceAIPage";
import PersonalProjectDetailPage from "./components/personalprojects/PersonalProjectDetailPage";
import ReactPortfolioPage from "./components/personalprojects/ReactPortfolioPage";
import SchoolProjectPage from "./components/schoolprojects/SchoolProjectPage";
import FitnessLogRoutePage from "./components/personalprojects/FitnessLogRoutePage";
import "./app.scss";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./context";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function ScrollRevealObserver() {
  const location = useLocation();

  useEffect(() => {
    const sections = document.querySelectorAll(".modern-section");
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    sections.forEach((section) => {
      section.classList.remove("is-visible");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return null;
}

function App() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div className={`app ${darkMode ? "theme-dark" : "theme-light"}`}>
      <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}>
        <Router>
          <ScrollRevealObserver />
          <Routes>
          <Route path="/" element={
            <>
              <Topbar/>
              <div className="sections home-sections">
                <Intro/>
                <FeaturedProject/>
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
          <Route path="/assistant" element={
            <>
              <Topbar/>
              <ChatAssistantPage />
              <Footer/>
            </>
          } />
          <Route path="/assist" element={<Navigate to="/assistant" replace />} />
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
          <Route path="/projects" element={<Navigate to="/personal-projects" replace />} />
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
          <Route path="/personal-projects/rag-ops-platform" element={
            <>
              <Topbar/>
              <RagOpsPlatformPage />
              <Footer/>
            </>
          } />
          <Route path="/personal-projects/snowflake-finance-ai-command-center" element={
            <>
              <Topbar/>
              <SnowflakeFinanceAIPage />
              <Footer/>
            </>
          } />
          <Route path="/projects/rag-ops-platform" element={<Navigate to="/personal-projects/rag-ops-platform" replace />} />
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
          <Route path="/fitness-log" element={
            <>
              <Topbar/>
              <FitnessLogRoutePage />
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