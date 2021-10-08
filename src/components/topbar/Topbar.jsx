import "./topbar.scss"
import {Person,Mail} from "@material-ui/icons"

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="wrapper">
                <div className="left">
                    <a href="#intro">Click me</a>
                    <div className="itemContainer">
                        <Person className="icon"/>
                        <span>+21 53 12 65</span>
                    </div>
                    <div className="itemContainer">
                        <Mail/>
                        <span>testAccount@hotmail.com</span>
                    </div>
                </div>
                <div className="right">
                </div>
            </div>            
        </div>
    )
}
