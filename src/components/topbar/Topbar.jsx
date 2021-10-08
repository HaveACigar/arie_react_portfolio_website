import "./topbar.scss"
import {Person,Mail} from "@material-ui/icons"

export default function Topbar({ menuOpen, setMenuOpen }) {
    return (
        <div className={"topbar " + (menuOpen && "active")}>
            <div className="wrapper">
                <div className="left">
                    <a href="#intro">Click me</a>
                    <div className="itemContainer">
                        <Person className="icon"/>
                        <span>+1 (734)945-3869</span>
                    </div>
                    <div className="itemContainer">
                        <Mail/>
                        <span>ariedekraker@gmail.com</span>
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
