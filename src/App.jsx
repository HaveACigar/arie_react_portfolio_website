import Contact from "./components/contact/Contact";
import Intro from "./components/intro/Intro";
import Portfolio from "./components/portfolio/Portfolio";
import Topbar from "./components/topbar/Topbar"
import Works from "./components/works/Works";
import AboutMe from "./components/aboutme/AboutMe";
import Menu from "./components/menu/Menu";
import "./app.scss";
import { useContext, useState } from "react";
import { ThemeContext } from "./context";


function App() {
  const [menuOpen,setMenuOpen] = useState(false)
  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode;
  return (
    <div className="app"  style={{
      color: darkMode && "white",
      backgroundColor: darkMode ? "#222" : "white", 
      }}>
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <div className="sections">
        <Intro/>
        <AboutMe/>
        <Works/>
        <Portfolio/>
        <Contact/>
      </div>
    </div>
  );
}

export default App;
