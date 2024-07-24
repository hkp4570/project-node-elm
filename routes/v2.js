
import express from "express";
import UserHandler from '../controller/v2/user';
import HongBaoHandler from "../controller/v2/hongBao";
import CitesHandler from '../controller/v1/cities';

const router = express.Router();

router.post('/login', UserHandler.login);
router.post('/changepassword', UserHandler.changePassword);
router.get('/signout', UserHandler.signout);
router.get('/users/:user_id/hongbaos', HongBaoHandler.getHongBao);
router.post('/users/:user_id/hongbao/exchange', HongBaoHandler.exchange);
router.get('/users/:user_id/expired_hongbaos', HongBaoHandler.getExpiredHongBao);
router.get('/pois/:geohash', CitesHandler.pois);

export default router;
