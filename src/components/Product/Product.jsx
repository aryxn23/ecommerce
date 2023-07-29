import React, { useEffect, useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import "../Product/product.css";
import { useNavigate } from "react-router-dom";

const Product = ({ products }) => {
    const navigate = useNavigate();

    const { currentId, setCurrentId } = useContext(AuthContext);
    const { wishlist, setWishlist } = useContext(AuthContext);

    const handleClick = (productId) => {
        setCurrentId(productId);
        setWishlist(false);
        navigate(`/product/${productId}`);
    };

    return (
        <div className="product-parent">
            {products.map((product) => (
                <div
                    className="product"
                    key={product._id}
                    onClick={() => handleClick(product._id)}
                >
                    <div className="product-img">
                        {/* <img src={"http://localhost:4000/" + product.imageUrl} alt="" /> */}
                        <img src={process.env.REACT_APP_URL + "/" + product.imageUrl} alt="Product" />
                    </div>

                    <div className="product-info">
                        <p>{product.name}</p>
                        <h3>{"₹" + product.price}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Product;


