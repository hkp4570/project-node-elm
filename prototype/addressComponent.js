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
          const location = result.rectangle.split(',');
          const cityInfo = {
            lat: location[0],
            lng: location[1],
            city: result.city,
          }
          resolve(cityInfo);
        }
      } catch (e) {
        reject(e);
      }
    })
  }
}

export default AddressComponent;
