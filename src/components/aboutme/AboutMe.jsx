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
                <p>Hello! I'm a data-driven professional with a strong background in software engineering and an evolving passion for data science. With a Bachelor's degree in Computer Science from Eastern Michigan University and ongoing Master's studies in Data Science and Analytics, I blend technical expertise with analytical acumen.</p>
                <br />
                <p className="update">
                    On this page, you'll discover a curated collection of both academic and personal projects that I have undertaken and successfully completed in the past. These projects showcase my skills and interests, reflecting my journey in the realms of software engineering and data science.</p>
            </div>
        </div>
    )
}
