import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';
import "../SingleProduct/singleProduct.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { AiOutlineHeart } from "react-icons/ai";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import 'bootstrap/dist/css/bootstrap.min.css';


const SingleProduct = (props) => {

    const { loggedIn, setLoggedIn } = useContext(AuthContext);
    const { user, setUser } = useContext(AuthContext);
    const { currentId, setCurrentId } = useContext(AuthContext);
    const { products, setProducts } = useContext(AuthContext);
    const [itemPresent, setItemPresent] = useState(false);
    const [quantityCounter, setQuantityCounter] = useState(0);
    const [isAlertDisplayed, setAlertDisplayed] = useState(false);

    useEffect(() => {

        const updateUser = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_URL}/updateuser` , {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: user.email,
                        updatedUser: user,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setAlertDisplayed(false);
                } else {
                    console.error('Error occurred while updating user');
                }
            } catch (error) {
                console.error('Error occurred while updating user', error);
            }
        };

        updateUser();
    }, [user]);

    useEffect(() => {

        console.log("CurrentId: " + currentId);

        if (loggedIn && user) {

            user.wishlist.includes(currentId) ? setItemPresent(true) : setItemPresent(false);

            const cartItemExists = user.cart.some((item) => item._id === currentId);

            // console.log(cartItemExists);
            if (cartItemExists) {
                const existingItem = user.cart.find((item) => item._id === currentId);
                const existingQuantity = existingItem.quantity;
                setQuantityCounter(existingQuantity);
            }
            else {
                setQuantityCounter(0);
            }
        }

    }, [loggedIn, user, currentId]);

    const handleCart = () => {
        if (!loggedIn) {
            return alert("Login First!");
        }

        const product = products.find((product) => product._id === currentId);

        const cartItemExists = user.cart.some((item) => item._id === currentId);

        if (!cartItemExists && quantityCounter !== 0) {
            const newCartItem = {
                ...product,
                quantity: quantityCounter,
            };

            console.log(newCartItem);
            const updatedUser = {
                ...user,
                cart: [...user.cart, newCartItem],
            };
            setUser(updatedUser);
            alert("Item Added To The Cart");
        } else {
            const updatedCart = user.cart.map((item) => {
                if (item._id === currentId) {
                    if (quantityCounter !== 0) {
                        alert("Item Updated");
                        return {
                            ...item,
                            quantity: quantityCounter,
                        };
                    } else {
                        alert("Item Removed From the Cart");
                        return null; // Skip the item by returning null (to be filtered out later)
                    }
                }
                return item;
            }).filter(Boolean); // Filter out null/undefined items

            const updatedUser = { ...user, cart: updatedCart };
            setUser(updatedUser);
        }
    };

    const handleWishlist = () => {
        if (!loggedIn) {
            return alert("Login First!");
        }

        setUser((prevUser) => {
            const updatedWishlist = prevUser.wishlist.includes(currentId)
                ? prevUser.wishlist.filter((url) => url !== currentId)
                : [...prevUser.wishlist, currentId];

            const alertMessage = prevUser.wishlist.includes(currentId)
                ? 'Product Removed From Wishlist'
                : 'Product Added To Wishlist';

            if (!isAlertDisplayed) {
                alert(alertMessage);
                setAlertDisplayed(true);
            }

            return { ...prevUser, wishlist: updatedWishlist };
        });
    };

    const increaseQuantity = () => {
        setQuantityCounter(quantityCounter + 1);
    };

    const decreaseQuantity = () => {
        if (quantityCounter > 0) {
            setQuantityCounter(quantityCounter - 1);
        }
    };

    return (
        <div className="singleProductContainer">

            <div className="singleProductImage">
                <img src={process.env.REACT_APP_URL + "/" + props.imageUrl} alt={props.name} />
            </div>

            <div className="singleProductDetails">
                <div className="title">{props.name}</div>
                <div className="price">{props.price}</div>
                <div className="description">{props.description}</div>

                <div className="availability">
                    <div className="counter">
                        <div className="minus" onClick={decreaseQuantity}>
                            <div className="text-divs">-</div>
                        </div>
                        <div className="quantity">
                            <div className="text-divs">{quantityCounter}</div>
                        </div>
                        <div className="plus">
                            <div className="text-divs" onClick={increaseQuantity}>
                                +
                            </div>
                        </div>
                    </div>

                    <div onClick={handleCart}>
                        <button type="submit">
                            {" "}
                            <AddShoppingCartIcon /> ADD TO CART
                        </button>
                    </div>

                    {/* <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-heart" viewBox="0 0 16 16" onClick={handleWishlist}>
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                            style={{ fill: itemPresent ? "red" : "currentColor" }}
                        />
                    </svg> */}

                    {itemPresent ? <FavoriteIcon className="bi-heart" style={{ fill: "red" }} onClick={handleWishlist} /> : <FavoriteBorderIcon className="bi-heart" onClick={handleWishlist} />}

                </div>

                <div className="item-category">
                    <div className="title">Category:</div>
                    <div className="description">{props.category}</div>
                </div>

                <div className="item-share">
                    <div className="title">Share:</div>
                    <div className="share-icons" style={{ alignSelf: "flex-start" }}>
                        <FaFacebookF
                            size={12}
                            style={{ margin: "0px 5px", cursor: "pointer", marginBottom: "10px" }}
                        />
                        <FaTwitter
                            size={12}
                            style={{ margin: "0px 5px", cursor: "pointer", marginBottom: "10px" }}
                        />
                        <FaInstagram
                            size={12}
                            style={{ margin: "0px 5px", cursor: "pointer", marginBottom: "10px" }}
                        />
                        <FaLinkedinIn
                            size={12}
                            style={{ margin: "0px 5px", cursor: "pointer", marginBottom: "10px" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;