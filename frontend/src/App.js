import React from "react";
import './index.css';
import data from './data';

function App() {
    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    }

    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }

    return (
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
                    <ul className="products">
                        {data.products.map(product => {
                            return (
                                <li>
                                    <div className="product">
                                        <img className="product-image" src={product.image} alt="product"/>
                                        <div className="product-name">
                                            <a href="product.html">{product.name}</a>
                                        </div>
                                        <div className="product-brand">{product.brand}</div>
                                        <div className="product-price">{product.price}р.</div>
                                        <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
                                    </div>
                                </li>
                            )
                        })};
                    </ul>
                </div>

            </main>
            <footer className="footer">
                All right reserved.
            </footer>
        </div>
    );
}

export default App;
