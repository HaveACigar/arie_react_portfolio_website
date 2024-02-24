import { useLocation } from 'react-router-dom';
import Intro from "./intro/Intro";
import AboutMe from "./aboutme/AboutMe";
import Works from "./works/Works";
import Portfolio from "./portfolio/Portfolio";
import Contact from "./contact/Contact";

function Sections() {
  const location = useLocation();
  const isRootPath = location.pathname === '/';

  return (
    isRootPath && (
      <div className="sections">
        <Intro/>
        <AboutMe/>
        <Works/>
        <Portfolio/>
        <Contact/>
      </div>
    )
  );
}

export default Sections;