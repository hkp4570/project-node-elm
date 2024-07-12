'use strict';

import mongoose from 'mongoose';
import cityData from '../../initData/cities'

const citySchema = new mongoose.Schema({
  data: {}
});

citySchema.statics.cityGuess = function(name){
  return new Promise(async (resolve, reject) => {
    console.log(name,'name')
  })
}

const Cities = mongoose.model('Cities', citySchema);


Cities.findOne((err, data) => {
  if (!data) {
    Cities.create({data: cityData});
  }
});

export default Cities
