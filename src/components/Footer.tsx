import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer>
            <div className="container bg-body-secondary p-5">
                <div className="row">
                    <div className="col-3">
                        <h2>VibeStrings</h2>
                        <ul className="list-unstyled">
                            <li className="list-item-with-logo">
                                <img src="/email.png" className="list-logo" />
                                Enquiry@VibeStrings.com
                            </li>

                            <li className="list-item-with-logo">
                                <img src="/location.png" className="list-logo" />
                                San Francisco
                            </li>
                        </ul>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-4">
                                <h4>PAGES</h4>
                                <ul className="list-unstyled">
                                    <li>Store</li>
                                    <li>Collections</li>
                                    <li>Support</li>
                                </ul>
                            </div>
                            <div className="col-4">
                                <h4>PRODUCT</h4>
                                <ul className="list-unstyled">
                                    <li>Terms</li>
                                    <li>Privacy Policy</li>
                                    <li>Copyright</li>
                                </ul>
                            </div>
                            <div className="col-4">
                                <h4>FOLLOW US</h4>
                                <ul className="list-unstyled d-flex gap-3">
                                    <li><img className="logo" src="/facebook.png" alt="Facebook" /></li>
                                    <li><img className="logo" src="/instagram-image.png" alt="Instagram" /></li>
                                    <li><img className="logo" src="/twitter-logo-png.png" alt="Twitter" /></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12 text-center pt-5">
                        <p className="mb-0">© 2022 Copyright.VibeStrings</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
