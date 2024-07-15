import AddressComponent from "../../prototype/addressComponent";
import pinyin from 'pinyin';
import Cities from "../../models/v1/cities";

class CityHandle extends AddressComponent {
  constructor() {
    super();
    this.getCity = this.getCity.bind(this);
    this.getExactAddress = this.getExactAddress.bind(this);
  };

  async getCityName(req) {
    try {
      const cityInfo = await this.guessPosition(req);
      const len = cityInfo.city.length;
      const city = cityInfo.city.substring(0, len - 1);
      const pinyinArr = pinyin(city, {
        style: pinyin.STYLE_NORMAL,
      })
      let cityName = '';
      pinyinArr.forEach(item => {
        cityName += item[0];
      })
      return cityName;
    } catch (e) {
      return 'beijing';
    }
  }

  async getCity(req, res) {
    const type = req.query.type;
    let cityInfo;
    try {
      switch (type) {
        case 'guess':
          const city = await this.getCityName(req);
          cityInfo = await Cities.cityGuess(city);
          break;
        case 'hot':
          cityInfo = await Cities.cityHot();
          break;
        case 'group':
          cityInfo = await Cities.cityGroup();
          break;
        default:
          res.json({
            name: 'ERROR_QUERY_TYPE',
            message: '参数错误',
          });
          return;
      }
      res.send(cityInfo);
    } catch (error) {
      res.send({
        name: 'ERROR_DATA',
        message: '获取数据失败',
      });
    }
  }

  async getCityById(req, res) {
    const cityId = req.params.id;
    if (isNaN(cityId)) {
      res.json({
        name: 'ERROR_PARAM_TYPE',
        message: '参数错误',
      });
      return;
    }
    try {
      const cityInfo = await Cities.getCityById(cityId);
      res.send(cityInfo);
    } catch (err) {
      res.send({
        name: 'ERROR_DATA',
        message: '获取数据失败',
      });
    }
  }

  async getExactAddress(req, res) {
    try{
      const position = await this.geocoder(req);
      res.send(position);
    }catch (err){
      console.log('获取精确位置信息失败');
      res.send({
        name: 'ERROR_DATA',
        message: '获取精确位置信息失败',
      });
    }
  }
}

export default new CityHandle();
