import Contact from "./components/contact/Contact";
import Intro from "./components/intro/Intro";
import Portfolio from "./components/portfolio/Portfolio";
import Topbar from "./components/topbar/Topbar"
import Works from "./components/works/Works";
import "./app.scss";
import { useContext, useState } from "react";
import Menu from "./components/menu/Menu";
import { ThemeContext } from "./context";

function App() {
  const [menuOpen,setMenuOpen] = useState(false)
  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode;
  return (
    <div className="app"  style={{
      backgroundColor: darkMode ? "#222" : "white", 
      color: darkMode && "white",
      }}>
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <div className="sections">
        <Intro/>
        <Works/>
        <Portfolio/>
        <Contact/>
      </div>
    </div>
  );
}

export default App;
