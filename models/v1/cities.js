import mongoose from 'mongoose';
import cityData from '../../initData/cities';

const citySchema = new mongoose.Schema({
  data: {},
})

citySchema.static.cityGuess = function (name){
  console.log(name, 'name');
}

const Cities = mongoose.model('Cities',citySchema);

Cities.findOne((err,data) => {
  if(!data){
    Cities.create({data: cityData})
  }
})

export default Cities;
