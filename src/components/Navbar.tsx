import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../features/postSlice";
import { RootState, AppDispatch } from "../store";


const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selectedNav, setSelectedNav] = useState('/');
    const [isScrolled, setIsScrolled] = useState(false); // State for scroll position

    const dispatch = useDispatch<AppDispatch>();

    // Access loggedInUser from the post slice
    const { loggedInUser } = useSelector(
      (state: RootState) => state.post
    );
  
    useEffect(() => {
      dispatch(fetchUsers());
    }, [dispatch]);
  

    // Scroll event to handle navbar transparency and progress bar
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 0); // Navbar turns background when scrolled

        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleNav = (item: any) => {
        setSelectedNav(item)
    }

    // Determine navbar class based on scroll and expanded state
    const navbarClass = `navbar navbar-expand-lg fixed-top ${isScrolled ? 'navbar-light bg-white shadow' : 'navbar-dark navbar-transparent'}`;


    return (
        <>
            <nav className={`${navbarClass} p-3`}>
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
                            className={`navbar-nav ${isCollapsed ? "justify-content-center navbar-main-link" : ""
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
                        </ul>
                        <div className={isCollapsed ? "ms-auto" : ""} onClick={() => handleNav("profile")}>
                            <Link to="profile" className={`profile-button nav-link bg-white rounded-pill py-1 ps-1 pe-2 ${selectedNav === "profile" && "nav-active"}`}><img className="profile-image" src={loggedInUser?.avatar} /> {loggedInUser?.name || "Profile"}</Link>
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