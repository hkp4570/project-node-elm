import addressComponent from "../../prototype/addressComponent";
import CitiesHandler from './cities';
import CitiesModel from '../../models/v1/cities';

class SearchHandler extends addressComponent {
  constructor() {
    super();
    this.search = this.search.bind(this);
  }

  async search(req, res) {
    let {type = 'search', keyword, city_id} = req.query;
    if (!keyword) {
      res.send({
        name: 'ERROR_QUERY_TYPE',
        message: '参数错误',
      })
      return;
    } else if (isNaN(city_id)) {
      try {
        const cityName = await CitiesHandler.getCityName(req);
        const cityInfo = await CitiesModel.cityGuess(cityName);
        city_id = cityInfo.id;
      } catch (err) {
        console.log('搜索地址时，获取定位城市失败')
        res.send({
          name: 'ERROR_GET_POSITION',
          message: '获取数据失败',
        })
      }
    }
    try {
      const cityInfo = await CitiesModel.getCityById(city_id);
      const resObj = await this.searchPlace(keyword, cityInfo.name, type);
      const cityList = [];
      resObj.data.forEach((item, index) => {
        cityList.push({
          name: item.title,
          address: item.address,
          latitude: item.location.lat,
          longitude: item.location.lng,
          geohash: item.location.lat + ',' + item.location.lng,
        })
      });
      res.send(cityList);
    } catch (err) {
      res.send({
        name: 'GET_ADDRESS_ERROR',
        message: '获取地址信息失败',
      });
    }
  }
}

export default new SearchHandler()
