import { useContext, useState } from "react";
import { ThemeContext } from "../../context";
import "./contact.scss"

export default function Contact() {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    const [message,setMessage] = useState(false);
    const handleSubmit = (e)=>{
        e.preventDefault();
        setMessage(true);
    }
    return (
        <div className="contact" id="contact">
            <div className="left">
                <img src="assets/contact.png" alt="" />
            </div>
            <div className="right">
                <h2>Contact</h2>
                <form onSubmit={handleSubmit}>
                    <input style={{backgroundColor: darkMode && "#555"}} type="text" placeholder="Name"/>
                    <input style={{backgroundColor: darkMode && "#555"}} type="text" placeholder="Email"/>
                    <textarea style={{backgroundColor: darkMode && "#555"}} placeholder="Message"></textarea>
                    <button type="submit">Send</button>
                    {message && <span>Thank you for you message! I'll try and get back to you as soon as possible.</span>}
                </form>
            </div>            
        </div>
    )
}
