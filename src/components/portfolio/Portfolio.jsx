import { useContext, useEffect, useState } from "react"
import PortfolioList from "../portfolioList/PortfolioList"
import "./portfolio.scss"
import {
    reactPortfolio,
    angularPortfolio} from "../../data"
import { ThemeContext } from "../../context"

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
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode

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
                    style={{color: darkMode && "#333"}} 
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
