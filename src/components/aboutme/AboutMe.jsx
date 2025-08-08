
import Typography from '@mui/material/Typography';
import "./aboutMe.scss";

export default function AboutMe() {
    return (
        <div className="aboutMe" id="aboutMe">
            <div className="left">
                <div className="cardBg"></div>
                <div className="card">
                    <img src="assets/python.png" alt="Python logo" />
                    <img src="assets/java.png" alt="Java logo" />
                    <img src="assets/react.png" alt="React logo" />
                    <img src="assets/nodejs.png" alt="NodeJs logo" />
                </div>
            </div>
            <div className="right">
                <Typography variant="h3" gutterBottom>About Me</Typography>
                <Typography variant="body1" paragraph>
                    Hello! I'm a data-driven professional with a strong background in software engineering and an evolving passion for data science. With a Bachelor's degree in Computer Science from Eastern Michigan University and ongoing Master's studies in Data Science and Analytics, I blend technical expertise with analytical acumen.
                </Typography>
            </div>
        </div>
    )
}
