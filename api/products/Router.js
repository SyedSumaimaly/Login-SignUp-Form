const express = require('express')
const router = express.Router()
const { getAllProducts, addProduct } = require('./Controller')

// Get All Products
router.get('/products', getAllProducts)

// Add product
router.post('/addproduct', addProduct)

module.exports = router