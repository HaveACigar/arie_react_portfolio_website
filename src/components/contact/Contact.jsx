import { useState } from "react";
import "./contact.scss"
import sample from "./contact.mp4"

export default function Contact() {
    const [message,setMessage] = useState(false);
    const handleSubmit = (e)=>{
        e.preventDefault();
        setMessage(true);
    }
    return (
        <div className="contact" id="contact">
            <div className="left">
                {/* <img src="assets/contact.png" alt="" /> */}
                <video className='videoTag' autoPlay loop muted>
                    <source src={sample} type='video/mp4' />
                    Video not supported
                </video>
            </div>
            <div className="right">
                <h2>Contact</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email"/>
                    <textarea placeholder="Message"></textarea>
                    <button type="submit">Send</button>
                    {message && <span>Thank you for you message! I'll try and get back to you as soon as possible.</span>}
                </form>
            </div>            
        </div>
    )
}
