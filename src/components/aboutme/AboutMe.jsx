import "./aboutMe.scss"

export default function AboutMe() {
    return (
        <div className="aboutMe" id="aboutMe">
            <div className="left">
                <div className="cardBg"></div>
                <div className="card">
                    <img src="assets/java.png" alt="Java logo" />
                    <img src="assets/react.png" alt="React logo" />
                    <img src="assets/nodejs.png" alt="NodeJs logo" />
                </div>
            </div>
            <div className="right">
                <h1>About me</h1>
                <p>I am a software engineer working at Ford Motor Company. I obtained a major in computer science and a minor in mathematics at Eastern Michigan University. I am looking for a position that would allow me to utilize and build on my programming skills.</p>
            </div>
        </div>
    )
}
