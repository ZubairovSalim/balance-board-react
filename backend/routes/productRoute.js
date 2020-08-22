import express from 'express';
import Product from '../models/productModel';
import {isAdmin, isAuth} from "../util";
import data from "../data";

const router = express.Router();

router.post('/', isAuth, isAdmin, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
    });

    const newProduct = await product.save();

    if (newProduct) {
        return res.status(201).send({msg: 'New product created', data: newProduct});
    } else {
        return res.status(500).send({msg: 'Error in creating product.'});
    }
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
        product.name= req.body.name;
        product.image= req.body.image;
        product.brand= req.body.brand;
        product.price= req.body.price;
        product.category= req.body.category;
        product.countInStock= req.body.countInStock;
        product.description= req.body.description;
    }

    const updatedProduct = await product.save();

    if (updatedProduct) {
        return res.status(200).send({msg: 'Product Updated', data: updatedProduct});
    } else {
        return res.status(500).send({msg: 'Error in updating product.'});
    }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    const productId = req.params.id;
    const deletedProduct = await Product.findById(productId);

    if (deletedProduct) {
        await deletedProduct.remove();
        return res.send({msg: 'Product Deleted'});
    } else {
        return res.send({msg: 'Error in deletion.'});
    }
});

router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (error) {
        res.send({msg: error.message});
    }
});

export default router;