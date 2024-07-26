import BaseComponent from "../../prototype/baseComponent";
import {Food as FoodModel, Menu as MenuModel} from '../../models/shopping/food';

class Food extends BaseComponent {
  constructor() {
    super();
  }

  // 商家食物列表
  async getMenu(req, res) {
    const restaurant_id = req.query.restaurant_id;
    const allMenu = req.query.allMenu;
    if (!restaurant_id || !Number(restaurant_id)) {
      console.log('获取餐馆参数ID错误');
      res.send({
        status: 0,
        type: 'ERROR_PARAMS',
        message: '餐馆ID参数错误',
      })
      return
    }
    let filter;
    if (allMenu) {
      filter = {restaurant_id};
    } else {
      filter = {
        restaurant_id, $where: function () {
          return this.foods.length
        }
      };
    }
    try {
      const menu = await MenuModel.find(filter);
      res.send(menu);
    } catch (err) {
      console.log('获取食品数据失败', err);
      res.send({
        status: 0,
        type: 'GET_DATA_ERROR',
        message: '获取食品数据失败'
      })
    }
  }
}

export default new Food();
