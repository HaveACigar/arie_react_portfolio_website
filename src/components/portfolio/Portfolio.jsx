import { FeaturedVideoTwoTone } from "@material-ui/icons"
import { useEffect, useState } from "react"
import PortfolioList from "../portfolioList/PortfolioList"
import "./portfolio.scss"
import {
    webPortfolio,
    mobilePortfolio} from "../../data"

export default function Portfolio() {
    const [selected,setSelected] = useState("featured")
    const [data,setData] = useState([])
    const list = [
        {
            id: "featured",
            title: "Featured",
        },
        {
            id: "web",
            title: "Web App",
        },
        {
            id: "mobile",
            title: "Mobile App",
        },
        {
            id: "design",
            title: "Design",
        },
        {
            id: "content",
            title: "Content",
        },
    ];

    useEffect(()=>{
        switch(selected){
            case "web":
                setData(webPortfolio);
                break;
            case "mobile":
                setData(mobilePortfolio);
                break;
        }
    },[selected])
    return (
        <div className="portfolio" id="portfolio">
            <h1>Portfolio</h1>
            <ul>
                {list.map(item=>(
                    <PortfolioList 
                    title={item.title} 
                    active={selected === item.id} 
                    setSelected={setSelected}
                    id={item.id}
                    />
                ))}
            </ul>
            <div className="container">
                {data.map((d) =>
                <div className="item">
                    <img src="assets/EMU.png" alt="" />
                    <h3>
                        EMU
                    </h3>
                </div>
                )}
                <div className="item">
                    <img src="assets/EMU.png" alt="" />
                    <h3>EMU</h3>
                </div>
                <div className="item">
                    <img src="assets/EMU.png" alt="" />
                    <h3>EMU</h3>
                </div>
                <div className="item">
                    <img src="assets/EMU.png" alt="" />
                    <h3>EMU</h3>
                </div>
                <div className="item">
                    <img src="assets/EMU.png" alt="" />
                    <h3>EMU</h3>
                </div>
                <div className="item">
                    <img src="assets/EMU.png" alt="" />
                    <h3>EMU</h3>
                </div>
                <div className="item">
                    <img src="assets/EMU.png" alt="" />
                    <h3>EMU</h3>
                </div>
            </div>
        </div>
    )
}
