const express = require('express');
const { listProducts, addProduct, removeProduct, updateProduct } = require('../controllers/productController');
const adminAuth = require('../middleware/adminAuth');

const productRouter = express.Router();

productRouter.get('/list', listProducts);
productRouter.post('/add', adminAuth, addProduct);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.post('/update', adminAuth, updateProduct);

module.exports = productRouter;
