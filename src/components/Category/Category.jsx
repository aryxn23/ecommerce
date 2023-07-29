import "../Category/category.css";
import { useNavigate } from 'react-router-dom';
import category1 from "assets/category/cat-1.jpg"
import category2 from "assets/category/cat-4.jpg"
import category3 from "assets/category/cat-2.jpg"
import category4 from "assets/category/cat-3.jpg"

const Category = () => {

    const navigate = useNavigate();

    const handleClick = (category) => {
        navigate(`/${category}`);
    };

    return (

        <div className="parent">


            <div className="category">

                <div className="category-1" onClick={() => handleClick("Headphones")}>
                    <img src={category1} alt="" />
                </div>

                <div className="category-2" onClick={() => handleClick("Earbuds")}>
                    <img src={category2} alt="" />
                </div>

                <div className="category-3" onClick={() => handleClick("Speaker")}>
                    <img src={category3} alt="" />
                </div>

                <div className="category-4" onClick={() => handleClick("Smartwatch")}>
                    <img src={category4} alt="" />
                </div>

            </div>

            <div className="popular">
                <h2>Popular Products</h2>
            </div>

        </div>

    )
}

export default Category;