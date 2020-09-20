import express from "express";
import {isAuth} from "../util";
import Order from "../models/orderModel";

const router = express.Router();

router.post("/", isAuth, async (req, res) => {
    console.log(req);
    const newOrder = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
    });

    const newOrderCreated = await newOrder.save();
    res.status(201).send({message: "New Order Created", data: newOrderCreated});
});

router.get("/:id", isAuth, async(req, res) => {
    const order = await Order.findOne({_id: req.params.id});

    if (order) {
        res.send(order);
    } else {
        res.status(404).send("Order not found");
    }
} )

export default router;