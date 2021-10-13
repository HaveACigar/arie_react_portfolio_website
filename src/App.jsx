import Contact from "./components/contact/Contact";
import Intro from "./components/intro/Intro";
import Portfolio from "./components/portfolio/Portfolio";
import Topbar from "./components/topbar/Topbar"
import Works from "./components/works/Works";
import "./app.scss";
import { useState } from "react";
import Menu from "./components/menu/Menu";

function App() {
  const [menuOpen,setMenuOpen] = useState(false)
  const [dark,setDark] = useState(false)
  return (
    <div className="app">
      <Topbar setDark={setDark} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <Menu dark={dark} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <div className="sections">
        <Intro dark={dark}/>
        <Portfolio dark={dark}/>
        <Works dark={dark}/>
        <Contact dark={dark}/>
      </div>
    </div>
  );
}

export default App;
