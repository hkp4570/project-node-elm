import express from 'express';
import OrderHandler from '../controller/v1/order';

const router = express.Router();
router.get('/v2/users/:user_id/orders', OrderHandler.getOrders);
router.get('/v1/users/:user_id/orders/:order_id/snapshot', OrderHandler.getDetail)

export default router;
