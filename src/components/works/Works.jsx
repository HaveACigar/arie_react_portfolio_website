import { useState } from "react";
import { Link } from 'react-router-dom';
import "./works.scss"

export default function Works() {
    const [currentSlide,setCurrentSlide] = useState(0);
    const data = [
        {
            id: "1",
            title: "Masters Works",
            description: "This is where I will post projects from my time at the University of Calgary",
            image: "./assets/Calgary_Logo.png",
            link: "/mastersprojects"
        },
        {
            id: "2",
            title: "Java Works",
            description: "This is where I will post projects involving Java, OOP and backend work",
            image: "./assets/java.png"
        },
        {
            id: "3",
            title: "Web Works",
            description: "This is where I will post projects involving webdesign and frontend work",
            image: "./assets/website.png"
        },
        {
            id: "4",
            title: "Undergrad Works",
            description: "This is where I will post projects from my time at EMU",
            image: "./assets/EMU.png"
        },
    ];

    const handleClick = (way)=>{
        way === "left" 
        ? setCurrentSlide(currentSlide > 0 ? currentSlide-1 : 2) :
        setCurrentSlide(currentSlide<data.length - 1 ? currentSlide + 1: 0)
    }
    return (
        <div className="works" id="works">
            <div className="slider" style={{transform: `translateX(-${currentSlide * 100}vw)`}}>
                {data.map(d=>(
                <div className="container" key={d.id}>
                    <div className="item">
                        <div className="left">
                            <div className="leftContainer">
                                <div className="imgContainer">
                                    <img src={d.icon} alt="" />
                                </div>
                                <h2>{d.title}</h2>
                                <p>
                                    {d.description}
                                </p>
                                {d.link && (
                                        <Link to={d.link}>
                                            <span>Projects</span>
                                        </Link>
                                    )}
                            </div>
                        </div>
                        <div className="right">
                            <img src={d.image} alt="" />
                        </div>
                    </div>
                    
                </div>
                ))}
            </div>
                <img src="assets/white_downarrow.png" className="arrow left" alt="" onClick={()=>handleClick("left")}/>
                <img src="assets/white_downarrow.png" className="arrow right" alt="" onClick={()=>handleClick("right")}/>
        </div>
    );
}
