import { useLocation } from 'react-router-dom';
import Intro from "./intro/Intro";
import AboutMe from "./aboutme/AboutMe";
import Contact from "./contact/Contact";

function Sections() {
  const location = useLocation();
  const isRootPath = location.pathname === '/';

  return (
    isRootPath && (
      <div className="sections">
        <Intro/>
        <AboutMe/>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0 24px 0' }}>
          <a href="/contactme" style={{
            display: 'inline-block',
            padding: '10px 22px',
            fontSize: '1.08rem',
            fontWeight: 600,
            color: '#fff',
            background: '#1976d2',
            borderRadius: 8,
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
            transition: 'background 0.2s',
          }}>Go to Contact Me Page</a>
        </div>
        <Contact/>
      </div>
    )
  );
}

export default Sections;