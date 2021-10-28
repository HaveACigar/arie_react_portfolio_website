import "./aboutMe.scss"

export default function AboutMe() {
    return (
        <div className="aboutMe">
            <div className="left">
                <div className="card-background"></div>
                <div className="card">
                    <img src="assets/java.png" alt="" />
                    <img src="assets/react.png" alt="" />
                    <img src="assets/nodejs.png" alt="" />
                </div>
            </div>
            <div className="right">
                <h1>About me</h1>
                <p>I am a software engineer working at Ford Motor Company. I obtained a major in computer science and a minor in mathematics at Eastern Michigan University. I am looking for a position that would allow me to utilize and build on my programming skills.</p>
            </div>
        </div>
    )
}
