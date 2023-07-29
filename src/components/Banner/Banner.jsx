import ".//banner.css";
import bannerImg from "assets/banner-img.png";

const Banner = () => {
    return (
        <div className="banner">

            <div className="banner-info">

                <div className="banner-text">
                    <h1>SALES</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit Voluptate minima eius beatae eos corruptil siue et gen heneq hibe kom cheb.</p>
                </div>

                <div className="banner-tags">
                    <a href="/" style={{color: "white"}}>Read More</a>
                    <a href="/" style={{ backgroundColor: "white", color: "black" }}>Shop Now</a>
                </div>

            </div>

            <div className="banner-img">
                <img src={bannerImg} alt="" />
            </div>

        </div>
    )
}

export default Banner;