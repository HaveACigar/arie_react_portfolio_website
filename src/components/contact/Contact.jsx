import { useContext, useState } from "react";
import { ThemeContext } from "../../context";
import "./contact.scss";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore"; 

export default function Contact() {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
    const handleSubmit = (e)=>{
        e.preventDefault();
        // db.collection("contacts")
        //     .add({
        //         name: name,
        //         email: email,
        //         message: message
        //     })
        //     .then(() => {
        //         alert("Your message has been submitted. I will try and reach back to you as soon as I am able.")
        //     })
        //     .catch((error) => {
        //         alert(error.message)
        //     });
        (async () => {
        const docRef = await addDoc(collection(db, "contacts"), {
            name: name,
            email: email,
            message: message
              });
              console.log("Document written with ID: ", docRef.id);
              alert("Thank you for your message! I will try and respond as soon as I am able.");
        
        setName("");
        setEmail("");
        setMessage("");
            })();
    };
    return (
        <div className="contact" id="contact">
            <div className="left">
                <img src="assets/contact.png" alt="" />
            </div>
            <div className="right">
                <h2>Contact</h2>
                <form onSubmit={handleSubmit}>
                    <input style={{backgroundColor: darkMode && "#555", color: darkMode && "white"}} type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input style={{backgroundColor: darkMode && "#555", color: darkMode && "white"}} type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <textarea style={{backgroundColor: darkMode && "#555", color: darkMode && "white"}} placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>            
        </div>
    )
}
