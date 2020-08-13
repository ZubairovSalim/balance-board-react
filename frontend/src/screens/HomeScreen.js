import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import "../index.css";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";

function HomeScreen(props) {
    const productList = useSelector(state => state.productList);
    const {products, loading, error} = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
    }, []);

    return loading ? <div>Loading...</div> :
        error ? <div>{error}</div> : (
        <ul className="products">
            {products.map(product => {
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
            })}
        </ul>
    )
}

export default HomeScreen;