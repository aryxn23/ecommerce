import "../Newsletter/newsletter.css";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";

const Newsletter = () => {
    return (
        <div className="newsletter">

            {/* <img src={newsletterImg} alt="" /> */}

            <div className="newsletter-info">
                <h4 style={{ marginBottom: '5px' }}>NEWSLETTER</h4>
                <h2>SIGN UP FOR LATEST UPDATES AND OFFERS</h2>

                <form>
                    <input type="email" placeholder="Email Address" />
                    <button type="submit">Subscribe</button>
                </form>

                <p style={{ fontSize: "0.9rem", marginTop: "7.5px" }}>Will be useed in accordance with our Privacy Policy</p>

                <span className="social-icons">

                    <div className="icon" style={{marginLeft: "0px"}}>
                        <FaFacebookF size={14} />
                    </div>

                    <div className="icon">
                        <FaTwitter size={14} />
                    </div>

                    <div className="icon">
                        <FaInstagram size={14} />
                    </div>

                    <div className="icon" style={{marginRight: "0px"}}>
                        <FaLinkedinIn size={14} />
                    </div>

                </span>

            </div>

        </div>
    );

}

export default Newsletter;
