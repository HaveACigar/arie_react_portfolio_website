import "./intro.scss"

export default function Intro() {
    return (
        <div className="intro" id="intro">
            <div className="left">
                <div className="imgContainer">
                    <img src="assets/Arie_ProfilePic.jpg" alt="A picture of me" />
                </div>
            </div>
            <div className="right">
                <div className="wrapper">
                    <h2>Hello! My name is</h2>
                    <h1>Arie DeKraker</h1>
                    <h3>and welcome to my website!<span></span></h3>
                </div>
                <a href="#portfolio">
                    <img src="assets/" alt="" />
                </a>
            </div>
            
        </div>
    )
}
