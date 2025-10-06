function Footer() {

    return (
    <footer className="footer p-5">
    <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <h2>LearningFoundry</h2>
                </div>
                <div className="col-md-3">
                    <h5>About Us</h5>
                    <p>
                        LearningFoundry is a lesson planning app that provides educators 
                        with a central place for organising and managing their lesson plans.
                    </p>
                </div>
               
            </div>
            <hr />
            <div className="row">
                <div className="col-md-6">
                    <p>&copy; 2025 LearningFoundry. All rights reserved.</p>
                </div>
                <div className="col-md-6 text-end">
                    <ul className="list-inline footer-links">
                        <li className="list-inline-item">
                            <a href="#" className="text-white">
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    );
}

export default Footer;