import "./portfolio.scss"

export default function Portfolio() {
    return (
        <div className="portfolio" id="portfolio">
            <h1>Portfolio</h1>
            <ul>
                <li>Featured</li>
                <li>Java from EMU</li>
                <li>Webdesign from EMU</li>
                <li>Current projects</li>
                <li>Ideas</li>
            </ul>
            <div className="container">
                <div className="item">
                    <img src="assets/EMU.png" alt="" />
                    <h3>EMU</h3>
                </div>
            </div>
        </div>
    )
}
