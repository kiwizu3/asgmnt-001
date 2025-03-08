const Header = () => {
    return (
        <div className="bg-img row align-items-center h-100 px-3 px-md-5">
            <div className="col-md-6 text-center text-md-start my-4 my-md-auto">
                <h1 className="text-white">Sed Imperdiet Enim li Vitae <strong>Viverra Justo</strong></h1>
                <p className="text-white">Nam sollicitudin nunc, cursus eros vulputate sed. Vestibulum sit amet tortor sit amet libero lobortis.</p>
                <div className="d-flex justify-content-center justify-content-md-start">
                    <button className="button-watch-video me-3 d-flex align-items-center">
                        <span className="watch-video-btn-container me-2">
                            <img className="watch-video-btn" src="assets/icons/play-btn.svg" alt="Play button" />
                        </span> WATCH VIDEO
                    </button>
                    <button className="button-get-started">GET STARTED</button>
                </div>
            </div>
            <div className="col-md-6 text-center">
                <img className="img-fluid w-75 w-md-100" src="assets/images/main-img.png" alt="Main Visual" />
            </div>
        </div>
    );
};

export default Header;