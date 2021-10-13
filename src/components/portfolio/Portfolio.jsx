import { FeaturedVideoTwoTone } from "@material-ui/icons"
import { useEffect, useState } from "react"
import PortfolioList from "../portfolioList/PortfolioList"
import "./portfolio.scss"
import {
    reactPortfolio,
    angularPortfolio} from "../../data"

export default function Portfolio() {
    const [selected,setSelected] = useState("react")
    const [data,setData] = useState([])
    const list = [
        {
            id: "react",
            title: "React",
        },
        {
            id: "angular",
            title: "Angular",
        },
    ];

    useEffect(()=>{
        switch(selected){
            case "react":
                setData(reactPortfolio);
                break;
            case "angular":
                setData(angularPortfolio);
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
                    <img src={d.img} alt="" />
                    <h3>
                        {d.title}
                    </h3>
                </div>
                )}
                </div>
        </div>
    )
}
