import AddressComponent from "../../prototype/addressComponent";
import formidable from 'formidable';
import crypto from 'crypto';
import UserModel from "../../models/v2/user";
import UserInfoModel from '../../models/v1/userInfo';
import moment from 'moment';

class UserHandler extends AddressComponent {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  async login(req, res) {
    const cap = req.cookies.cap;
    if (!cap) {
      console.log('验证码失效')
      res.send({
        status: 0,
        type: 'ERROR_CAPTCHA',
        message: '验证码失效',
      })
      return;
    }
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
      const {username, password, captcha_code} = fields;
      try {
        if (!username) {
          throw new Error('用户名错误');
        } else if (!password) {
          throw new Error('密码错误');
        } else if (!captcha_code) {
          throw new Error('验证码错误');
        }
      } catch (err) {
        console.log('登录参数错误', err);
        res.send({
          status: 0,
          type: 'ERROR_QUERY',
          message: err.message,
        })
        return;
      }
      if (cap.toUpperCase().toString() !== captcha_code.toUpperCase().toString()) {
        res.send({
          status: 0,
          type: 'ERROR_CAPTCHA',
          message: '验证码不正确',
        })
        return;
      }
      const newPassword = this.encryption(password);
      try {
        const user = await UserModel.findOne({username});
        if (!user) {
          const user_id = await this.getId('user_id');
          const cityInfo = await this.guessPosition(req);
          const registe_time = moment(new Date()).format('YYYY-MM-DD HH:mm');
          const newUser = {username, password: newPassword, user_id};
          const newUserInfo = {username, user_id, id: user_id, city: cityInfo.city, registe_time};
          UserModel.create(newUser);
          const createUser = new UserInfoModel(newUserInfo);
          const userInfo = await createUser.save();
          req.session.user_id = user_id;
          res.send(userInfo);
        } else if (user.password.toString() !== newPassword.toString()) {
          console.log('用户登录密码错误')
          res.send({
            status: 0,
            type: 'ERROR_PASSWORD',
            message: '密码错误',
          })
        } else {
          req.session.user_id = user.user_id;
          const userInfo = await UserInfoModel.findOne({user_id: user.user_id});
          res.send(userInfo);
        }
      } catch (err) {
        console.log('用户登陆失败', err);
        res.send({
          status: 0,
          type: 'SAVE_USER_FAILED',
          message: '登陆失败',
        })
      }
    })
  }

  encryption(password) {
    return this.md5(this.md5(password).substring(2, 7) + this.md5(password));
  }

  md5(password) {
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('base64');
  }

  async changePassword(req, res) {
    const cap = req.cookies.cap;
    if (!cap) {
      console.log('验证码失效')
      res.send({
        status: 0,
        type: 'ERROR_CAPTCHA',
        message: '验证码失效',
      })
      return
    }
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
      const {username, oldPassWord, newPassword, confirmPassword, captcha_code} = fields;
      try {
        if (!username) {
          throw new Error('用户名参数错误');
        } else if (!oldPassWord) {
          throw new Error('旧密码参数错误');
        } else if (!newPassword) {
          throw new Error('新密码参数错误');
        } else if (!confirmPassword) {
          throw new Error('确认密码参数错误');
        } else if (newPassword !== confirmPassword){
          throw new Error('新密码与确认密码不一致');
        } else if (!captcha_code){
          throw new Error('验证码错误');
        }
      } catch (err) {
        console.log('修改密码参数错误', err);
        res.send({
          status: 0,
          type: 'ERROR_QUERY',
          message: err.message,
        })
        return
      }
      if(cap.toUpperCase().toString() !== captcha_code.toUpperCase().toString()){
        res.send({
          status: 0,
          type: 'ERROR_CAPTCHA',
          message: '验证码不正确',
        })
        return
      }
      const md5Password = this.encryption(oldPassWord);
      try{
        const user = await UserModel.findOne({username});
        if(!user){
          res.send({
            status: 0,
            type: 'USER_NOT_FOUND',
            message: '未找到当前用户',
          })
        }else if (user.password.toString() !== md5Password.toString()){
          res.send({
            status: 0,
            type: 'ERROR_PASSWORD',
            message: '密码不正确',
          })
        } else {
          user.password = this.encryption(newPassword);
          user.save();
          res.send({
            status: 1,
            success: '密码修改成功',
          })
        }
      }catch (err) {
        console.log('修改密码失败', err);
        res.send({
          status: 0,
          type: 'ERROR_CHANGE_PASSWORD',
          message: '修改密码失败',
        })
      }
    })
  }
}

export default new UserHandler();
