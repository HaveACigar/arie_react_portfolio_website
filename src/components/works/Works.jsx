import "./works.scss"

export default function Works() {
    const data = [
        
    ]
    return (
        <div className="works" id="works">
            <div className="slider">
                <div className="container">
                    <div className="item">
                        <div className="left">
                            <div className="leftContainer">
                                <div className="imgContainer">
                                    <img src="assets/" alt="" />
                                </div>
                                <h2>Title</h2>
                                <p>
                                    dsafdfasdfadsfadfasdfasf
                                </p>
                                <span>Projects</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                            <img src="assets/white_downarrow.png" className="arrow left" alt="" />
                            <img src="assets/white_downarrow.png" className="arrow right" alt="" />
                        </div>
            </div>
        </div>
    )
}
