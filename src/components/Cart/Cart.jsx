import { useContext, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import CartItems from "../Cart/CartItems.jsx";
import { AuthContext } from "../../contexts/AuthContext";
import CloseIcon from '@mui/icons-material/Close';
import { BsCartX } from "react-icons/bs";
import "../Cart/cart.css";

const Cart = () => {

    const navigate = useNavigate();

    const { user, setUser } = useContext(AuthContext);
    const { cart, setCart } = useContext(AuthContext);
    const { loggedIn, setLoggedIn } = useContext(AuthContext);
    const { products, setProducts } = useContext(AuthContext);
    const { currentId, setCurrentId } = useContext(AuthContext);
    const [subtotal, setSubtotal] = useState(0);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (loggedIn) {
            const totalAmount = user.cart.reduce((total, product) => {
                const amount = Number(product.quantity * product.price);
                return total + amount;
            }, 0);

            setSubtotal(totalAmount);
        }
    }, [user, products, loggedIn]);

    const handleClick = () => {
        setCart(false);
    }


    const getItem = (productId) => {
        setCurrentId(productId)
        navigate(`/product/${productId}`);
        setCart(false);
    }

    const updateCartItem = (productId, quantityDelta) => {
        const updatedCart = user.cart.map(item => {
            if (item._id === productId) {
                return {
                    ...item,
                    quantity: item.quantity + quantityDelta,
                };
            }
            return item;
        });

        const updatedUser = {
            ...user,
            cart: updatedCart,
        };

        setUser(updatedUser);
    };

    const increaseQuantity = (productId) => {
        updateCartItem(productId, 1);
    };

    const decreaseQuantity = (productId, productQuantity) => {
        if (productQuantity === 1) {
            removeItem(productId);
        } else {
            updateCartItem(productId, -1);
        }
    };

    const removeItem = (productId) => {
        const updatedCart = user.cart.filter(item => item._id !== productId);
        const updatedUser = { ...user, cart: updatedCart };
        setUser(updatedUser);
    };

    const handleCheckout = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/create-checkout-session` , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: user, subtotal: subtotal }),
            });

            const data = await response.json();
            console.log(data.session);
            const { url } = data.session;

            window.location.href = url;
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    const redirectHome = () => {
        setCart(false);
        navigate("/");
    }

    return (
        <>

            <div className="cart-screen">

                <div className="cart-top">
                    <div className="heading">SHOPPING CART</div>
                    <div className="close-cart">{<CloseIcon onClick={handleClick} fontSize='large' />}</div>
                </div>

                {loggedIn && user.cart.length > 0 && (
                    <div className="content">

                        <div className="items-container">
                            {user.cart.map((product) =>
                                <CartItems
                                    key={product._id}
                                    imageUrl={product.imageUrl}
                                    title={product.name}
                                    quantityCounter={product.quantity}
                                    price={product.price}
                                    getItem={() => getItem(product._id)}
                                    increaseQuantity={() => increaseQuantity(product._id, product.quantity)}
                                    decreaseQuantity={() => decreaseQuantity(product._id, product.quantity)}
                                    removeItem={() => removeItem(product._id)}
                                />
                            )}
                        </div>

                        <div className="cart-bottom">

                            <div className="cart-total">

                                <div className="subtotal">SUBTOTAL:</div>
                                <div className="amount">₹{subtotal}</div>

                            </div>

                            <div className="cart-checkout">
                                {/* <button onClick={handleCheckout}>Checkout</button> */}

                                <button onClick={handleCheckout} disabled={loading}>
                                    {loading ? 'Processing...' : 'Checkout'}
                                </button>
                            </div>

                        </div>
                    </div>)}

                {(!loggedIn || user.cart.length === 0) && (
                    <div className="empty-container">
                        <div className="empty-icon"> <BsCartX /> </div>
                        <div className="empty-heading">No products in the cart.</div>
                        <div className="empty-button"><button onClick={redirectHome}>RETURN TO SHOP</button></div>
                    </div>
                )}


            </div>
        </>
    )
}

export default Cart;