import React, { useContext, useEffect, useState } from 'react';
import Product from '../Product/Product.jsx';
import CloseIcon from '@mui/icons-material/Close';
import '../Wishlist/wishlist.css';
import { AuthContext } from '../../contexts/AuthContext.jsx';

const Wishlist = () => {
    const { user, products, setWishlist } = useContext(AuthContext);
    const [wishlistProducts, setWishlistProducts] = useState([]);

    useEffect(() => {
        const filteredProducts = products.filter(product =>
            user.wishlist.includes(product._id)
        );
        setWishlistProducts(filteredProducts);
    }, [user, products]);

    const handleClick = () => {
        setWishlist(false);
    };

    return (
        <>
            {wishlistProducts.length > 0 && (
                <div className="full-screen">
                    <div className="animated-div">
                        <div className="popular">
                            <h2>Wishlist Products</h2>
                        </div>
                        <div className="wishlist-container">
                            <Product products={wishlistProducts} />
                        </div>
                        <CloseIcon
                            className="close-icon"
                            onClick={handleClick}
                            fontSize="large"
                        />
                        {/* <button className="close-button" onClick={handleClick}>X</button> */}
                    </div>
                </div>
            )}
        </>
    );
};

export default Wishlist;
