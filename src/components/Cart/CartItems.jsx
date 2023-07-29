import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import CloseIcon from '@mui/icons-material/Close';

const CartItems = (props) => {

    const { imageUrl, title, quantityCounter, price } = props;
    const { user, setUser } = useContext(AuthContext);

    return (
        <div className="cart-item">

            {/* <img src={"http://localhost:4000/" + imageUrl} alt="Product" onClick={props.getItem} /> */}

            <img src={process.env.REACT_APP_URL + "/" + imageUrl} alt="Product" onClick={props.getItem} />


            <div className="item-details">

                <div className="item-title" onClick={props.getItem}>{title}</div>

                <div className="item-availability">
                    <div onClick={props.decreaseQuantity}>-</div>
                    <div>{quantityCounter}</div>
                    <div onClick={props.increaseQuantity}>+</div>
                </div>

                <div className="item-quantity">
                    <div>{quantityCounter}</div>
                    <div>x</div>
                    <div>₹{price}</div>
                </div>

            </div>

            <div className="close" onClick={props.removeItem}>  <CloseIcon fontSize='medium' /> </div>


        </div>
    );
}

export default CartItems;