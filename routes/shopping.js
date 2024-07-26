import express from 'express';
import ShopHandler from '../controller/shopping/shop';
import CategoryHandler from '../controller/shopping/category';
import FoodHandler from '../controller/shopping/food';

const router = express.Router();

router.get('/restaurants', ShopHandler.getRestaurants);
router.get('/v2/restaurant/category', CategoryHandler.getCategories);
router.get('/v1/restaurants/delivery_modes', CategoryHandler.getDelivery);
router.get('/v1/restaurants/activity_attributes', CategoryHandler.getActivity);
router.get('/restaurant/:restaurant_id', ShopHandler.getRestaurantDetail);
router.get('/v2/menu', FoodHandler.getMenu);


export default router;
