import fetch from 'node-fetch';
import IdsModel from '../models/ids';

class BaseComponent {
  constructor() {
    this.idList = ['restaurant_id', 'food_id', 'order_id', 'user_id', 'address_id', 'cart_id', 'img_id', 'category_id', 'item_id', 'sku_id', 'admin_id', 'statis_id'];
  }

  async fetch(url = '', data = {}, type = 'GET', resType = 'JSON') {
    type = type.toUpperCase();
    resType = resType.toUpperCase();
    if (type === 'GET') {
      let dataSet = '';
      Object.keys(data).forEach(key => {
        dataSet += key + '=' + data[key] + '&';
      })
      if (dataSet !== '') {
        dataSet = dataSet.substring(0, dataSet.length - 1);
        url = url + '?' + dataSet;
      }
    }

    let requestConfig = {
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }

    if (type === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }
    let responseJson;
    try {
      const response = await fetch(url, requestConfig);
      responseJson = resType === 'TEXT' ? await response.text() : await response.json();
    } catch (e) {
      console.log('获取http数据失败', e);
      throw new Error(e);
    }
    return responseJson;
  }

  async getId(type) {
    if (!this.idList.includes(type)) {
      console.log('id类型错误');
      throw new Error('id类型错误');
      return
    }
    try {
      const idData = await IdsModel.findOne();
      idData[type]++;
      await idData.save();
      return idData[type];
    } catch (err) {
      console.log('获取ID数据失败');
      throw new Error(err)
    }
  }
}

export default BaseComponent;
