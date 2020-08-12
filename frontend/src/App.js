import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
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
                        <a href="index.html">Balance-Board-Shop</a>
                        <img src="public/images/brand.svg" alt="logo"/>
                    </div>
                    <div className="header-links">
                        <a href="cart.html">Cart</a>
                        <a href="signin.html">Sign In</a>
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
                        <Route path="/products/:id" component={ProductScreen} />
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
