import AddressComponent from "../../prototype/addressComponent";
import pinyin from 'pinyin';
import Cities from "../../models/v1/cities";

class CityHandle extends AddressComponent {
  constructor() {
    super();
    this.getCity = this.getCity.bind(this);
  };

  async getCityName(req) {
    try {
      const cityInfo = await this.guessPosition(req);
      const pinyinArr = pinyin(cityInfo.city, {
        style: pinyin.STYLE_NORMAL,
      })
      let cityName = '';
      pinyinArr.forEach(item => {
        cityName += item[0];
      })
      return cityName;
    } catch (e) {
      return 'beijingshi';
    }
  }

  async getCity(req, res, next) {
    const type = req.query.type;
    let cityinfo;
    try {
      switch (type) {
        case 'guess':
          const city = await this.getCityName(req);
          console.log(Cities, 'Cities')
          console.log(Cities.cityGuess)
          cityinfo = await Cities.cityGuess(city);
      }
    } catch (error) {

    }
  }
}

export default new CityHandle();
