import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MastersProjects from './components/mastersprojects/MastersProjects';
import Contact from "./components/contact/Contact";
import Intro from "./components/intro/Intro";
import Portfolio from "./components/portfolio/Portfolio";
import Topbar from "./components/topbar/Topbar";
import Works from "./components/works/Works";
import AboutMe from "./components/aboutme/AboutMe";
import Menu from "./components/menu/Menu";
import "./app.scss";
import { useContext, useState } from "react";
import { ThemeContext } from "./context";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div className="app" style={{ color: darkMode && "white", backgroundColor: darkMode ? "#222" : "white" }}>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <div className="sections">
                <Intro/>
                <AboutMe/>
                <Works/>
                <Portfolio/>
                <Contact/>
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
          <Route path="/works" element={
            <>
              <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <Works />
            </>
          } />
          <Route path="/portfolio" element={
            <>
              <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <Portfolio />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <Contact />
            </>
          } />
          <Route path="/mastersprojects" element={<MastersProjects />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;