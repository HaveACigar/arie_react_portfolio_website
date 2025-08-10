import ContactMe from "./components/contact/ContactMe";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MastersProjects from './components/mastersprojects/MastersProjects';
import Contact from "./components/contact/Contact";
import Intro from "./components/intro/Intro";
import Topbar from "./components/topbar/Topbar";
import AboutMe from "./components/aboutme/AboutMe";
import Menu from "./components/menu/Menu";
import PortfolioWorks from "./components/PortfolioWorks";
import "./app.scss";
import { useContext, useState } from "react";
import { ThemeContext } from "./context";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
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
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <div className="sections" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', position: 'relative', paddingTop: 48, paddingBottom: 48 }}>
                <Intro/>
                <div style={{
                  maxWidth: 260,
                  background: darkMode ? '#333' : '#fff',
                  borderRadius: 10,
                  padding: '16px 18px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  margin: '0 auto 0 auto',
                  textAlign: 'center',
                  border: darkMode ? '1px solid #444' : '1px solid #e3f0ff',
                }}>
                  <h2 style={{
                    marginBottom: 10,
                    fontSize: '1.08rem',
                    color: darkMode ? '#90caf9' : '#1976d2',
                    letterSpacing: 1,
                  }}>Tech Stack</h2>
                  <ul style={{ fontSize: '0.98rem', lineHeight: 1.7, paddingLeft: 0, margin: 0, listStyle: 'none' }}>
                    <li>React (Frontend)</li>
                    <li>Material-UI (UI Components)</li>
                    <li>SCSS (Styling)</li>
                    <li>Google Cloud Platform (Hosting)</li>
                    <li>Node.js (Build Tools)</li>
                    <li>GitHub (Version Control)</li>
                  </ul>
                </div>
                <div style={{
                  maxWidth: 480,
                  background: darkMode ? '#222' : '#fff',
                  borderRadius: 12,
                  padding: '24px 28px',
                  boxShadow: '0 2px 12px rgba(25, 118, 210, 0.08)',
                  margin: '20px auto 0 auto',
                  textAlign: 'center',
                  border: darkMode ? '1px solid #444' : '1px solid #e3f0ff',
                }}>
                  <h2 style={{
                    marginBottom: 16,
                    fontSize: '1.18rem',
                    color: darkMode ? '#90caf9' : '#1976d2',
                    letterSpacing: 1,
                  }}>About Me</h2>
                  <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
                    Hello! I'm a data-driven professional with a strong background in software engineering and an evolving passion for data science. With a Bachelor's degree in Computer Science from Eastern Michigan University and ongoing Master's studies in Data Science and Analytics, I blend technical expertise with analytical acumen.
                  </p>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
                  <a href="/mastersprojects" style={{
                    display: 'inline-block',
                    padding: '10px 22px',
                    fontSize: '1.08rem',
                    fontWeight: 600,
                    color: darkMode ? '#fff' : '#222',
                    background: darkMode ? '#1976d2' : '#90caf9',
                    borderRadius: 8,
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                    transition: 'background 0.2s',
                    zIndex: 2,
                  }}>View Masters Projects</a>
                  <a href="/contactme" style={{
                    display: 'inline-block',
                    padding: '10px 22px',
                    fontSize: '1.08rem',
                    fontWeight: 600,
                    color: darkMode ? '#fff' : '#222',
                    background: darkMode ? '#388e3c' : '#81c784',
                    borderRadius: 8,
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(56, 142, 60, 0.10)',
                    transition: 'background 0.2s',
                    zIndex: 2,
                  }}>Contact Me</a>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 32 }}>
                  <a href="/Arie_Resume_general.pdf" download style={{
                    display: 'inline-block',
                    padding: '10px 22px',
                    fontSize: '1.08rem',
                    fontWeight: 600,
                    color: darkMode ? '#fff' : '#222',
                    background: darkMode ? '#1976d2' : '#90caf9',
                    borderRadius: 8,
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
                    transition: 'background 0.2s',
                    zIndex: 2,
                  }}>Download Resume (PDF)</a>
                </div>
              </div>
            </>
          } />
          <Route path="/aboutme" element={
            <>
              <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <AboutMe />
            </>
          } />
          <Route path="/portfolio" element={
            <>
              <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <PortfolioWorks />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <Contact />
            </>
          } />
          <Route path="/contactme" element={
            <>
              <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <ContactMe />
            </>
          } />
          <Route path="/mastersprojects" element={<MastersProjects />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;