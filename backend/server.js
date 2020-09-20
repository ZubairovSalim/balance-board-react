import Product from "./models/productModel";

const path = require('path')
import express from 'express';
import data from "./data";
import dotenv from 'dotenv';
import config from "./config";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from "./routes/orderRoute";

dotenv.config();

const  {PWD = __dirname} = process.env;

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();

app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.get("/api/product/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    product ? res.send(product) : res.status(404).send({msg: "Product Not Found."});

});

app.get("/api/products", (req, res) => {
    res.send(data.products);
});

app.use('*', (req, res) => {
    console.log(path.resolve(PWD, 'frontend'));
    res.sendFile('index.html', {
        root: path.resolve(PWD, 'frontend')
    })

});

app.listen(5000, () => {console.log("Server started at http://localhost:5000")});