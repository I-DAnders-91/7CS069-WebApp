import { useRef } from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';

function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    return (
        <header>
            <h3>Logo</h3>
            <nav ref={navRef}>
                <a href="/#">Home</a>
                <a href="/#">About</a>
                <a href="/#">My Lessons</a>
                <a href="/#">Create Lesson</a>
                <button className="nav-button nav-close-button" onClick={showNavbar}> {/*Close button*/}
                    <FaTimes />
                </button>
            </nav>
            <button className="nav-button" onClick={showNavbar}> {/*Hamburger menu button*/}
                <FaBars />
            </button>
            </header>
    );
}

export default Navbar;