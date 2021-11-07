import { useEffect, useRef } from "react"
import { init } from "ityped";
import "./intro.scss"

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
    return (
        <div className="intro" id="intro">
            <div className="left">
                <div className="imgContainer">
                    <img src="assets/Arie_ProfilePic.PNG" alt="A picture of me" />
                </div>
            </div>
            <div className="right">
                <div className="wrapper">
                    <h2>Hello! My name is</h2>
                    <h1>Arie DeKraker</h1>
                    <h3>and welcome to my <span ref={textRef}></span></h3>
                </div>
                <a href="#portfolio">
                    <img src="assets/white_downarrow.png" alt="click here to move down!"/>
                </a>
            </div>
            
        </div>
    )
}
