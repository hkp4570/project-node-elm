import mongoose from "mongoose";
import entryData from '../../initData/entry';

const entrySchema = new mongoose.Schema({
  id: Number,
  is_in_serving: Boolean,
  description: String,
  title: String,
  link: String,
  image_url: String,
  icon_url: String,
  title_color: String
})

const entryModel = mongoose.model('Entry', entrySchema);

entryModel.findOne((err, data) => {
  if (!data) {
    for (let i = 0; i < entryData.length; i++) {
      entryModel.create(entryData[i]);
    }
  }
})

export default entryModel;
