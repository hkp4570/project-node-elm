import express from 'express';
import CityHandle from '../controller/v1/cities';
import UserHandle from '../controller/v1/user';
import CaptchasHandle from '../controller/v1/captchas';
import AddressHandler from '../controller/v1/addresss';
import SearchHandler from '../controller/v1/search';
import CartsHandler from '../controller/v1/carts';
import RemarkHandler from '../controller/v1/remark';
import OrderHandler from '../controller/v1/order';

const router = express.Router();

router.get('/cities', CityHandle.getCity);
router.get('/cities/:id', CityHandle.getCityById);
router.get('/exactaddress', CityHandle.getExactAddress);
router.get('/user', UserHandle.getUserInfo);
router.post('/captchas', CaptchasHandle.getCaptchas);
router.get('/users/:user_id/addresses', AddressHandler.getAddress);
router.post('/users/:user_id/addresses', AddressHandler.addAddress);
// 检查订单
router.post('/carts/checkout', CartsHandler.checkout);
// 搜索周边地址
router.get('/pois',SearchHandler.search);
router.get('/carts/:cart_id/remarks', RemarkHandler.getRemarks);
// 下单
router.post('/users/:user_id/carts/:cart_id/orders', OrderHandler.postOrder);
router.get('/payment/queryOrder', (req, res) => {
  res.send({
    status: 0,
    type: 'PAY_FAILED',
    message: '暂不开放支付功能',
  });
})

export default router;
