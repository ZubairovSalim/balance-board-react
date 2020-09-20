import React from "react";
import {BrowserRouter, Route, Link} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import {useSelector} from "react-redux";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

function App() {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    }

    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="header">
                    <div className="brand">
                        <button onClick={openMenu}>&#9776;</button>
                        <Link to="/">Balance-Board-Shop</Link>
                        <img src="/public/images/brand.svg" alt="logo"/>
                    </div>
                    <div className="header-links">
                        <Link to="/cart">Cart</Link>
                        {userInfo ?
                            <Link to="/profile">{userInfo.name}</Link> :
                            <Link to="/signin">Sign In</Link>}
                    </div>
                </header>
                <aside className="sidebar">
                    <h3>Balance Board Categories</h3>
                    <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                    <ul>
                        <li><a href="index.html">Original</a></li>
                        <li><a href="index.html">Short</a></li>
                        <li><a href="index.html">Legendary</a></li>
                    </ul>
                </aside>
                <main className="main">
                    <div className="content">
                        <Route path="/order/:id" component={OrderScreen} />
                        <Route path="/placeorder" component={PlaceOrderScreen} />
                        <Route path="/payment" component={PaymentScreen} />
                        <Route path="/shipping" component={ShippingScreen} />
                        <Route path="/product/:id" component={ProductScreen} />
                        <Route path="/products" component={ProductsScreen} />
                        <Route path="/register" component={RegisterScreen} />
                        <Route path="/signin" component={SigninScreen} />
                        <Route path="/cart/:id?" component={CartScreen} />
                        <Route path="/" exact={true} component={HomeScreen} />
                    </div>
                </main>
                <footer className="footer">
                    All right reserved.
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
