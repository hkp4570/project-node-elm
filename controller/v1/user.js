import AddressComponent from "../../prototype/addressComponent";
import UserInfoModel from '../../models/v1/userInfo';

class UserHandle extends AddressComponent {
  constructor() {
    super();
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  async getUserInfo(req, res, next) {
    console.log(req.session, 'req.session');
    const sid = req.session.user_id;
    const qid = req.query.user_id;
    const user_id = sid || qid;
    if (!user_id || !Number(user_id)) {
      res.send({
        status: 0,
        type: 'GET_USER_INFO_FAIELD',
        message: '通过session获取用户信息失败',
      })
      return;
    }
    try {
      const userInfo = await UserInfoModel.findOne({user_id}, '-_id');
      res.send(userInfo);
    } catch (err) {
      console.log('通过session获取用户信息失败', err);
      res.send({
        status: 0,
        type: 'GET_USER_INFO_FAIELD',
        message: '通过session获取用户信息失败',
      })
    }
  }
}

export default new UserHandle();
