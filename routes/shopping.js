import express from 'express';
import ShopHandler from '../controller/shopping/shop';
import CategoryHandler from '../controller/shopping/category';

const router = express.Router();

router.get('/restaurants', ShopHandler.getRestaurants);
router.get('/v2/restaurant/category', CategoryHandler.getCategories);
router.get('/v1/restaurants/delivery_modes', CategoryHandler.getDelivery);
router.get('/v1/restaurants/activity_attributes', CategoryHandler.getActivity);


export default router;
