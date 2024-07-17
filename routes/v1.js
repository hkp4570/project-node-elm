import express from 'express';
import CityHandle from '../controller/v1/cities';
import UserHandle from '../controller/v1/user';
import CaptchasHandle from '../controller/v1/captchas';
import AddressHandler from '../controller/v1/addresss';
import SearchHandler from '../controller/v1/search';

const router = express.Router();

router.get('/cities', CityHandle.getCity);
router.get('/cities/:id', CityHandle.getCityById);
router.get('/exactaddress', CityHandle.getExactAddress);
router.get('/user', UserHandle.getUserInfo);
router.post('/captchas', CaptchasHandle.getCaptchas);
router.get('/users/:user_id/addresses', AddressHandler.getAddress);
router.post('/users/:user_id/addresses', AddressHandler.getAddress);
// 搜索周边地址
router.get('/pois',SearchHandler.search);

export default router;
