import { useContext, useEffect, useRef } from "react"
import { init } from "ityped";
import "./intro.scss"
import { ThemeContext } from "../../context"

export default function Intro() {

    const textRef = useRef();
    useEffect(()=>{
        init(textRef.current, { 
            showCursor: false,
            backDelay: 1500,
            backSpeed: 60,
            showCursor: true, 
            strings: ['website!', 'workshop!' , 'playground!'] 
        });
    }, []);
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    return (
        <div className="intro" id="intro">
            <div className="left">
                <div className="imgContainer">
                    <img src="assets/Arie_Profile_Pic.jpg" alt="A picture of me" />
                </div>
            </div>
            <div className="right">
                <div className="wrapper">
                    <h2 style={{color: darkMode && "#555"}}>Hello! My name is</h2>
                    <h1 style={{color: darkMode && "#555"}}>Arie DeKraker</h1>
                    <h3 style={{color: darkMode && "#555"}}>and welcome to my <span ref={textRef}></span></h3>
                </div>
                <a href="#portfolio">
                    <img src="assets/white_downarrow.png" alt="click here to move down!"/>
                </a>
            </div>
            
        </div>
    )
}
