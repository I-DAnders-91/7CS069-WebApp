import { NavLink } from 'react-router';

function Footer() {

    return (
    <footer className="footer p-5 brand-footer">
    <div className="container">
            <hr />
            <div className="row">
                <div className="col-md-6">
                    <p>&copy; 2025 LearningFoundry. All rights reserved.</p>
                </div>
                <div className="col-md-6 text-end">
                    <div className="list-inline footer-links">
                        <NavLink className="list-inline-item text-white" to="privacy-policy" end>
                                    Privacy Policy
                        </NavLink>
                    </div>
                </div>
            </div>
     </div>
    </footer>
    );
}

export default Footer;