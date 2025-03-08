import { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selectedNav, setSelectedNav] = useState('/');

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleNav = (item: any) => {
        console.log("what", item)
        setSelectedNav(item)
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top p-3">
                <div className="container-fluid">
                    <div className="position-relative">
                        <Link className="navbar-brand position-absolute top-m2" to="/">
                            <img className="logo" src="assets/images/logo.png" alt="" />
                        </Link>
                    </div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={handleToggle}
                        aria-controls="navbarNav"
                        aria-expanded={!isCollapsed}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className={`collapse navbar-collapse ${!isCollapsed ? "show full-page" : ""
                            }`}
                        id="navbarNav"
                    >
                        <ul
                            className={`navbar-nav ${isCollapsed ? "justify-content-center ms-auto" : ""
                                }`}
                        >
                            <li className="nav-item" onClick={() => handleNav("/")}>
                                <Link className={`nav-link ${selectedNav === "/" && "nav-active"}`} to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item" onClick={() => handleNav("posts")}>
                                <Link className={`nav-link ${selectedNav === "posts" && "nav-active"}`} to="posts">
                                    Posts
                                </Link>
                            </li>
                            {/* <li className="nav-item" onClick={() => handleNav("about")}>
                <a className={`nav-link ${selectedNav === "about" && "nav-active"}`} href="profile">
                  Profile
                </a>
              </li>
              <li className="nav-item" onClick={() => handleNav("community")}>
                <a className={`nav-link ${selectedNav === "community" && "nav-active"}`} href="#">
                  Community
                </a>
              </li>
              <li className="nav-item" onClick={() => handleNav("blog")}>
                <a className={`nav-link ${selectedNav === "blog" && "nav-active"}`} href="#">
                  Blog
                </a>
              </li> */}
                        </ul>
                        <div className={isCollapsed ? "ms-auto" : ""} onClick={() => handleNav("profile")}>
                            <Link to="profile" className={`nav-link ${selectedNav === "profile" && "nav-active"}`}>Profile</Link>
                        </div>
                        {!isCollapsed && (
                            <button
                                className="btn-close position-absolute top-0 right-1 m-3"
                                onClick={handleToggle}
                                aria-label="Close"
                            ></button>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;