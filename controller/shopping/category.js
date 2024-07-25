import BaseComponent from "../../prototype/baseComponent";
import CategoryModel from '../../models/shopping/category';
import DeliveryModel from "../../models/shopping/delivery";
import ActivityModel from '../../models/shopping/activity';

class Category extends BaseComponent {
  constructor() {
    super();
  }

  async getCategories(req, res) {
    try {
      const categories = await CategoryModel.find({});
      res.send(categories);
    } catch (e) {
      console.log('获取categories失败');
      res.send({
        status: 0,
        type: 'ERROR_DATA',
        message: '获取categories失败'
      })
    }
  }

  // 配送方式
  async getDelivery(req, res) {
    try {
      const deliveries = await DeliveryModel.find({});
      res.send(deliveries);
    } catch (e) {
      console.log('获取配送方式数据失败');
      res.send({
        status: 0,
        type: 'ERROR_DATA',
      })
    }
  }

  // 活动列表
  async getActivity(req, res) {
    try {
      const activities = await ActivityModel.find({});
      res.send(activities);
    } catch (e) {
      console.log('获取活动数据失败');
      res.send({
        status: 0,
        type: 'ERROR_DATA',
        message: '获取活动数据失败'
      })
    }
  }
}

export default new Category();
