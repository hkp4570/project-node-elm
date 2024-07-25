import express from 'express';
import ShopHandler from '../controller/shopping/shop';
import CategoryHandler from '../controller/shopping/category';

const router = express.Router();

router.get('/restaurants', ShopHandler.getRestaurants);
router.get('/v2/restaurant/category', CategoryHandler.getCategories);


export default router;
