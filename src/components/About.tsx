
const About = () => {
    return (
        <>
            <div className="row h-100 bg-img-about">
                <div className="col-6 my-auto p-about-img-1">
                    <img className="img-fluid" src="assets/images/main-02.png" alt="" />
                </div>
                <div className="col-6 my-auto p-about-1">
                    <h3>Vivamus sit amet <strong>interdum</strong></h3>
                    <img className="about-indicator" src="assets/images/about-indicator.svg" alt="" />
                    <p>Vivamus et luctus mauris. Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam.</p>
                    <button className="btn btn-primary rounded-pill about-button">See Details</button>
                </div>
                <div className="my-5"></div>
                <div className="col-6 my-auto p-about-2">
                    <h3>Vivamus sit amet <strong>interdum</strong></h3>
                    <img className="about-indicator" src="assets/images/about-indicator.svg" alt="" />
                    <p>Vivamus et luctus mauris. Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam.</p>
                    <button className="btn btn-primary rounded-pill about-button">See Details</button>
                </div>
                <div className="col-6 my-auto p-about-img-2">
                    <img className="img-fluid" src="assets/images/main-02.png" alt="" />
                </div>
            </div>
        </>
    )
}

export default About;