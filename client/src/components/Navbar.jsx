import { useRef } from 'react';
import { NavLink } from 'react-router';

function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    } 

    return (
        <header>
            <nav className="navbar navbar-expand-lg brand-navbar">
                <div className="container-fluid">
                    <img src="/img/lessonFoundry-logo.png" alt="LearningFoundry Logo" className="navbar-logo d-inline-block align-text-top" />
                    <a className="navbar-brand" href="#">LearningFoundry</a>
                    <button className="navbar-toggler custom-toggler" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/About">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/MyLessons">My Lessons</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Create a Lesson</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success search-btn" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;