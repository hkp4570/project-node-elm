import mongoose from "mongoose";
import paymentData from '../../initData/payments';

const Schema = new mongoose.Schema({
  description: String,
  disabled_reason: String,
  id: Number,
  is_online_payment: Boolean,
  name: String,
  promotion: [],
  select_state: Number,
});

const model = mongoose.model("Payments", Schema);

model.findOne((err,data) => {
  if(!data){
    paymentData.forEach(item => {
      model.create(item);
    })
  }
})

export default model;
