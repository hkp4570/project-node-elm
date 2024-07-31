import mongoose from "mongoose";
import remarkData from '../../initData/remark';

const remarkSchema = new mongoose.Schema({
  remarks:[]
})

const Remark = new mongoose.model("Remark",remarkSchema);

Remark.findOne((err,data) => {
  if(!data){
    Remark.create(remarkData);
  }
})

export default Remark;
