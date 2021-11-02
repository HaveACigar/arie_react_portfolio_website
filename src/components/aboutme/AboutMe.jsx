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
                <p>I use this page to display my work as well as work on my web design skills. Some of the pages are work in progress. I plan on trying to add several updates throughout the week, but might miss days occasionally. You can view progress updates by viewing the commits on my github page. (link to it at the top)</p>
            </div>
        </div>
    )
}
