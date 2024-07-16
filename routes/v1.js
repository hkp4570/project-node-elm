import express from 'express';
import CityHandle from '../controller/v1/cities';
import UserHandle from '../controller/v1/user';
import CaptchasHandle from '../controller/v1/captchas';

const router = express.Router();

router.get('/cities', CityHandle.getCity);
router.get('/cities/:id', CityHandle.getCityById);
router.get('/exactaddress', CityHandle.getExactAddress);
router.get('/user', UserHandle.getUserInfo);
router.post('/captchas', CaptchasHandle.getCaptchas);

export default router;
