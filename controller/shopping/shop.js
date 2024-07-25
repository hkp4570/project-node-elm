import AddressComponent from "../../prototype/addressComponent";
import ShopModel from '../../models/shopping/shop';
import CateGoryModel from './category';

class Shop extends AddressComponent {
  constructor() {
    super();
    this.getRestaurants = this.getRestaurants.bind(this);
  }

  // 获取餐馆列表
  async getRestaurants(req, res) {
    const {
      latitude,
      longitude,
      offset = 0,
      limit = 20,
      keyword,
      restaurant_category_id,
      order_by,
      extras,
      delivery_mode = [],
      support_ids = [],
      restaurant_category_ids = [],
    } = req.query;
    // console.log(req.query, 'req.query');
    try {
      if (!latitude) {
        throw new Error('latitude参数错误');
      } else if (!longitude) {
        throw new Error('longitude参数错误');
      }
    } catch (err) {
      console.log('latitude,longitude参数错误');
      res.send({
        status: 0,
        type: 'ERROR_PARAMS',
        message: err.message
      })
      return;
    }
    const filter = {};
    if (restaurant_category_ids.length && Number(restaurant_category_ids[0])) {
      const category = await CateGoryModel.findById(restaurant_category_ids[0]);
      Object.assign(filter, {category});
    }
    const sortBy = {};
    if (Number(order_by)) {
      // 5:距离最近 6:销量最高 1:起送价最低 2:配送速度最快 3:评分最高 0:智能排序
      switch (Number(order_by)) {
        case 1:
          Object.assign(sortBy, {float_minimum_order_amount: 1});
          break;
        case 2:
          Object.assign(filter, {location: {$near: [longitude, latitude]}});
          break;
        case 3:
          Object.assign(sortBy, {rating: -1});
          break;
        case 5:
          Object.assign(filter, {location: {$near: [longitude, latitude]}});
          break;
        case 6:
          Object.assign(sortBy, {recent_order_num: -1});
          break;
      }
    }
    // 配送方式
    if (delivery_mode.length) {

    }
    // 活动支持方式
    if (support_ids.length) {

    }
    const restaurants = await ShopModel.find(filter, '-_id').sort(sortBy).limit(Number(limit)).skip(Number(offset));
    const from = `${longitude},${latitude}`;
    let to = '';
    restaurants.forEach((item, index, self) => {
      const split = index === self.length - 1 ? '' : '|';
      to += `${item.longitude},${item.latitude}${split}`;
    })
    try {
      if (restaurants.length) {
        const distance_duration = await this.getDistance(from, to);
        restaurants.map((item, index) => {
          return Object.assign(item, distance_duration[index]);
        })
      }
    } catch (err) {
      console.log('从addressComoponent获取测距数据失败', err);
      restaurants.map(item => {
        return Object.assign(item, {distance: '10公里', order_lead_time: '40分钟'})
      })
    }
    res.send(restaurants);
  }

  // 获取餐馆详情
  async getRestaurantDetail(req, res) {
    const restaurant_id = req.params.restaurant_id;
    if (!restaurant_id || !Number(restaurant_id)) {
      console.log('获取餐馆详情参数ID错误');
      res.send({
        status: 0,
        type: 'ERROR_PARAMS',
        message: '餐馆ID参数错误',
      })
      return
    }
    try {
      const result = await ShopModel.findOne({id: restaurant_id});
      res.send(result);
    } catch (err) {
      console.log('获取餐馆详情失败', err);
      res.send({
        status: 0,
        type: 'GET_DATA_ERROR',
        message: '获取餐馆详情失败'
      })
    }
  }
}

export default new Shop();
