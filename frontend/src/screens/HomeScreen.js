import React from "react";
import {Link} from "react-router-dom";
import data from "../data";

function HomeScreen(props) {
    return (
        <ul className="products">
            {data.products.map(product => {
                return (
                    <li>
                        <div className="product">
                            <Link to={`products/${product.id}`}>
                                <img className="product-image" src={product.image} alt="product"/>
                            </Link>
                            <div className="product-name">
                                <Link to={`products/${product.id}`}>{product.name}</Link>
                            </div>
                            <div className="product-brand">{product.brand}</div>
                            <div className="product-price">{product.price}р.</div>
                            <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
                        </div>
                    </li>
                )
            })};
        </ul>
    )
}

export default HomeScreen;