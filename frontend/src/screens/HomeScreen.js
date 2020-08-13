import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import "../index.css";

function HomeScreen(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get("/api/products",  );
            setProducts(data);
        }
        fetchData();

        return () => {
            //
        }
    }, []);

    return (
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