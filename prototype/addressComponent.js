import {key as defaultKey} from '../key.js';
import BaseComponent from "./baseComponent";

class AddressComponent extends BaseComponent {
  constructor() {
    super();
    this.key = defaultKey;
    this.defaultIp = '114.247.50.2';
  }

  // 获取定位地址
  async guessPosition(req) {
    let ip;
    return new Promise(async (resolve, reject) => {
      if (process.env.NODE_ENV !== 'development') {
        ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress || req.ip || this.defaultIp;
      } else {
        ip = this.defaultIp;
      }
      try {
        const result = await this.fetch('https://restapi.amap.com/v3/ip', {
          ip,
          key: this.key,
        });
        if (result.status === '1') {
          const location = result.rectangle.split(';');
          const geoArr = location[0].split(',');
          const cityInfo = {
            lat: geoArr[0],
            lng: geoArr[1],
            city: result.city,
          }
          resolve(cityInfo);
        }
      } catch (e) {
        reject(e);
      }
    })
  }

  // 获取精确的地址
  async geocoder(req) {
    try {
      const address = await this.guessPosition(req);
      const params = {
        key: this.key,
        location: address.lat + ',' + address.lng,
      }
      const resp = await this.fetch('https://restapi.amap.com/v3/geocode/regeo', params);
      if (resp && resp.status === '1') {
        return resp;
      } else {
        throw new Error('geocoder获取定位失败');
      }
    } catch (err) {
      console.log('geocoder获取定位失败', err);
      throw new Error(err);
    }
  }

  // 搜索地址
  async searchPlace(keyword, cityName, type = 'search') {
    try {
      const resObj = await this.fetch('http://apis.map.qq.com/ws/place/v1/search', {
        key: 'RLHBZ-WMPRP-Q3JDS-V2IQA-JNRFH-EJBHL',
        keyword: encodeURIComponent(keyword),
        boundary: 'region(' + encodeURIComponent(cityName) + ',0)',
        page_size: 10,
      })
      if (resObj.status === 0) {
        return resObj;
      } else {
        throw new Error('搜索位置失败');
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  // 根据geohash获取地址信息
  async getPois(lat, lng) {
    try {
      const params = {
        key: this.key,
        location: lng + ',' + lat,
        output: 'json',
      };
      const res = await this.fetch('https://restapi.amap.com/v3/geocode/regeo', params);
      if (res.status === '1') {
        return res;
      } else {
        throw new Error('根据geohash获取地址信息失败');
      }
    } catch (err) {
      console.log('getpois获取定位失败', err)
      throw new Error(err);
    }
  }
}

export default AddressComponent;
