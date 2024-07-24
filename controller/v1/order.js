import BaseComponent from "../../prototype/baseComponent";
import OrderModel from '../../models/bos/order';

class Order extends BaseComponent {
  constructor() {
    super();
  }

  async getOrders(req, res) {
    const user_id = req.params.user_id;
    const {offset = 0, limit = 0} = req.query;
    try {
      if (user_id && !Number(user_id)) {
        throw new Error('user_id参数错误');
      } else if (!Number(limit)) {
        throw new Error('limit参数错误');
      } else if (typeof Number(offset) !== 'number') {
        throw new Error('offset参数错误');
      }
    } catch (err) {
      console.log(err);
      res.send({
        status: 0,
        type: 'ERROR_PARAMS',
        message: err.message
      })
      return
    }
    try {
      const orders = await OrderModel.find({user_id}, '-_id').limit(Number(limit)).skip(Number(offset));
      const timeNow = Date.now();
      orders.map(item => {
        if (timeNow - item.order_time < 900000) {
          item.status_bar.title = '等待支付';
        } else {
          item.status_bar.title = '支付超时';
        }
        item.time_pass = Math.ceil((timeNow - item.order_time) / 1000);
        item.save();
        return item;
      })
      res.send(orders);
    } catch (err) {
      console.log('获取订单列表失败', err);
      res.send({
        status: 0,
        type: 'ERROR_GET_ORDER_LIST',
        message: '获取订单列表失败'
      })
    }
  }
}

export default new Order();
