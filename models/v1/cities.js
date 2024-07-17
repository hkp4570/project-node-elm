'use strict';

import mongoose from 'mongoose';
import cityData from '../../initData/cities'

const citySchema = new mongoose.Schema({
  data: {}
});

citySchema.statics.cityGuess = function (name) {
  return new Promise(async (resolve, reject) => {
    const firstWord = name.substring(0, 1).toUpperCase();
    try {
      const city = await this.findOne();
      Object.entries(city.data).forEach(item => {
        if (item[0] === firstWord) {
          const result = item[1].find(f => f.pinyin === name);
          resolve(result);
        }
      })
    } catch (err) {
      reject({
        name: 'ERROR_DATA',
        message: '查找数据失败',
      });
      console.error(err);
    }
  })
}

citySchema.statics.cityHot = function () {
  return new Promise(async (resolve, reject) => {
    try {
      const city = await this.findOne();
      resolve(city.data.hotCities);
    } catch (err) {
      reject({
        name: 'ERROR_DATA',
        message: '查找数据失败',
      });
      console.error(err);
    }
  })
}

citySchema.statics.cityGroup = function () {
  return new Promise(async (resolve, reject) => {
    try {
      const city = await this.findOne();
      const cityObj = city.data;
      Reflect.deleteProperty(cityObj, '_id');
      Reflect.deleteProperty(cityObj, 'hotCities');
      resolve(cityObj);
    } catch (err) {
      reject({
        name: 'ERROR_DATA',
        message: '查找数据失败',
      });
      console.error(err);
    }
  })
}

citySchema.statics.getCityById = function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const city = await this.findOne();
      const cityObj = city.data;
      Object.entries(cityObj).forEach(item => {
        if (item[0] !== '_id' && item[0] !== 'hotCities') {
          const cityItem = item[1].find(f => f.id == id);
          if (cityItem){
            resolve(cityItem);
          }
        }
      })
    } catch (err) {
      reject({
        name: 'ERROR_DATA',
        message: '查找数据失败',
      });
      console.error(err);
    }
  })
}

const Cities = mongoose.model('Cities', citySchema);


Cities.findOne((err, data) => {
  if (!data) {
    Cities.create({data: cityData});
  }
});

export default Cities
