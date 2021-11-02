import "./topbar.scss"
import {Person,Mail} from "@material-ui/icons"
import { useContext } from "react"
import { ThemeContext } from "../../context"

export default function Topbar({ menuOpen, setMenuOpen }) {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode

    const handleClick = ()=>{
        theme.dispatch({type: "TOGGLE"})
    }
    return (
        <div className={"topbar " + (menuOpen && "active")}>
            <div className="wrapper">
                <div className="left">
                    <div className="intro">
                        <a href="#intro">
                            <img src="assets/black_downarrow.png" alt="" />
                        </a>
                    </div>
                    <div className="toggle">
                        <img src="assets/sun_icon.png" alt="toggleIcon" />
                        <img src="assets/moon_icon.png" alt="toggleIcon" />
                        <div className="toggleButton" onClick={handleClick} style={{left: darkMode ? 0 : 25}}></div>
                    </div>                   
                    <div className="itemContainer">
                        <Person className="icon"/>
                        <span>+1(734)945-3869</span>
                    </div>
                    <div className="itemContainer">
                        <Mail/>
                        <span>ariedekraker@gmail.com</span>
                    </div>
                    <div className="imageLinks">
                        <a href="https://www.linkedin.com/in/arie-dekraker-824738141/">
                            <img src="assets/linkedin.png" alt="" />
                        </a>
                    </div>
                    <div className="imageLinks">
                        <a href="https://github.com/HaveACigar">
                            <img src="assets/github.png" alt="" />
                        </a>
                    </div>
                    <div className="imageLinks">
                        <a href="https://www.hackerrank.com/ariedekraker">
                            <img src="assets/hackerrank.png" alt="" />
                        </a>
                    </div>
                </div>
                <div className="right">
                    <div className="beyondBurger" onClick={()=>setMenuOpen(!menuOpen)}>
                        <span className="line1"></span>
                        <span className="line2"></span>
                        <span className="line3"></span>
                    </div>
                </div>
            </div>            
        </div>
    )
}
