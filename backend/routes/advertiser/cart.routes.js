import express from 'express';

import { createCart, getCartById, updateCart, deleteCart } from '../../controllers/advertiser/cart.controller.js';

const router = express.Router();

// Cart Routes
router.post('/carts', createCart);
router.get('/carts/:cartId', getCartById);
router.put('/carts/:cartId', updateCart);
router.delete('/carts/:cartId', deleteCart);

export default router;