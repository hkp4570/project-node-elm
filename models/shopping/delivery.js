import mongoose from "mongoose";
import DeliveryData from "../../initData/delivery";

const deliverySchema = new mongoose.Schema({
  color: String,
  id: Number,
  is_solid: Boolean,
  text: String
})

const Delivery = mongoose.model('Delivery', deliverySchema);

Delivery.findOne((err, data) => {
  if(!data){
    Delivery.create(DeliveryData);
  }
})

export default Delivery;
