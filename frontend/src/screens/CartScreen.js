import React, {useEffect} from 'react';
import {addToCart, removeFromCart} from "../actions/cartActions";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
    }

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, []);

    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>
                            Price
                        </div>
                    </li>
                    {
                        cartItems.length === 0 ?
                            <div>Cart is empty</div> :
                            cartItems.map(item => {
                                return (
                                    <li>
                                        <div className="cart-image">
                                            <img src={item.image} alt="product"/>
                                        </div>
                                        <div className="cart-name">
                                            <div>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </div>
                                            <div>
                                                Qty:
                                                <select value={item.qty} onChange={(e) => {
                                                    console.log(e.target.value);
                                                    dispatch(addToCart(item.product, e.target.value))
                                                }}>
                                                    {[...Array(item.countInStock).keys()].map(x =>
                                                        <option key={x + 1}>{x + 1}</option>
                                                    )}
                                                </select>
                                                <button className="button" onClick={() => removeFromCartHandler(item.product)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        <div className="cart-price">
                                            {item.price}руб.
                                        </div>
                                    </li>
                                )
                            })
                    }
                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    Subtotal ({cartItems.reduce((sum, item) => +sum + (+item.qty), 0)} items)
                    : {cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0)} руб.
                </h3>
                <button className="button primary full-width" onClick={checkoutHandler} disabled={cartItems.length === 0}>
                    Proceed to Checkout
                </button>
                </div>
        </div>
    )
}

export default CartScreen;