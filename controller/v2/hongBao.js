import BaseComponent from "../../prototype/baseComponent";
import HongBaoModel from '../../models/v2/hongBao';

class HongBao extends BaseComponent {
  constructor(props) {
    super(props);
    this.getHongBao = this.getHongBao.bind(this);
    this.getExpiredHongBao = this.getExpiredHongBao.bind(this);
  }

  async getHongBao(req, res, next) {
    this.hongBaoHandler(req, res, 'intime');
  }
  async getExpiredHongBao(req,res){
    this.hongBaoHandler(req,res,'expired');
  }

  async hongBaoHandler(req, res, type) {
    const present_status = type === 'intime' ? 1 : 4;
    const user_id = req.params.user_id;
    const {limit = 0, offset = 0} = req.query;
    try {
      if (!user_id || !Number(user_id)) {
        throw new Error('用户id错误');
      } else if (!Number(limit)) {
        throw new Error('limit参数错误');
      } else if (typeof Number(offset) !== 'number') {
        throw new Error('offset参数错误');
      }
    } catch (err) {
      console.log(err.message);
      res.send({
        status: 0,
        type: 'ERROR_PARAMS',
        message: err.message
      })
      return;
    }
    try {
      const hongbaos = await HongBaoModel.find({present_status}).limit(Number(limit)).skip(Number(offset));
      res.send(hongbaos)
    } catch (err) {
      console.log('获取红包数据失败');
      res.send({
        status: 0,
        type: 'ERROR_TO_GET_HONGBAO_DATA',
        message: '获取红包数据失败'
      })
    }
  }

  async exchange(req,res){
    res.send({
      status: 0,
      type: 'NOT_ALLOWD_API',
      message: '无效的兑换码'
    })
  }

}

export default new HongBao();
