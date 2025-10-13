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
                        <div className="navbar-nav me-auto mb-2 mb-lg-0">
                            <NavLink className="nav-item nav-link" to="/" end>
                                Home
                            </NavLink>
                            <NavLink className="nav-item nav-link" to="/about" end>
                            About
                            </NavLink>
                            <NavLink className="nav-item nav-link" to="/my-lessons" end>
                            My Lessons
                            </NavLink>
                        </div>
                        <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success search-btn" type="submit">
                                    <i class="bi bi-search"></i>
                                </button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;