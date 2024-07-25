import AddressComponent from "../../prototype/addressComponent";
import ShopModel from '../../models/shopping/shop';

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

    }
    const sortBy = {};
    if (Number(order_by)) {

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
          return Object.assign(item,distance_duration[index]);
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
}

export default new Shop();
