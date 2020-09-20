import React, {useEffect} from 'react';
import {addToCart, removeFromCart} from "../actions/cartActions";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import CheckoutSteps from "../copmponents/CheckoutSteps";
import {createOrder, detailsOrder} from "../actions/orderActions";

function OrderScreen(props) {
    const dispatch = useDispatch();
    const orderDetails = useSelector(state => state.orderDetails);
    const {loading, order, error} = orderDetails;

    const payHandler = () => {};

    useEffect(() => {
        dispatch(detailsOrder(props.match.params.id));
    }, []);


    return (
        loading ? <div>Loading ...</div> : error ? <div>{error}</div> :
        <div>
            <div className="placeorder">
                <div className="placeorder-info">
                    <div>
                        <h3>Shipping</h3>
                        <div>{order.shipping.address}, {order.shipping.city}
                            {order.shipping.postalCode}, {order.shipping.country}
                        </div>
                        <div>
                            {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered. "}
                        </div>
                    </div>
                    <div>
                        <h3>Payment</h3>
                        <div>
                            Payment Method: {order.payment.paymentMethod}
                        </div>
                        <div>
                            {order.isPaid ? "Paid at " + order.isPaid : "Not Paid. "}
                        </div>
                    </div>
                    <div>
                        <ul className="cart-list-container">
                            <li>
                                <h3>Shopping Cart</h3>
                                <div>
                                    Price
                                </div>
                            </li>
                            {
                                order.orderItems.length === 0 ?
                                    <div>Cart is empty</div> :
                                    order.orderItems.map(item => {
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
                                                        Qty: {item.qty}
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
                </div>
                <div className="placeorder-action">
                    <ul>
                        <li>
                            <button className="button primary full-width" onClick={payHandler}>Pay Now</button>
                        </li>
                        <li>
                            <h3>Order Summary</h3>
                        </li>
                        <li>
                            <div>Items</div>
                            <div>{order.itemsPrice}р.</div>
                        </li>
                        <li>
                            <div>Shipping</div>
                            <div>{order.shippingPrice}р.</div>
                        </li>
                        <li>
                            <div>Tax</div>
                            <div>{order.taxPrice}р.</div>
                        </li>
                        <li>
                            <div>Order Total</div>
                            <div>{order.totalPrice}р.</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OrderScreen;