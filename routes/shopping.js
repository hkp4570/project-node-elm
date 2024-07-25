import express from 'express';
import ShopHandler from '../controller/shopping/shop';

const router = express.Router();

router.get('/restaurants', ShopHandler.getRestaurants);


export default router;
