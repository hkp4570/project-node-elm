import mongoose from "mongoose";
import ActivityData from '../../initData/activity';

const activitySchema = new mongoose.Schema({
  description: String,
  icon_color: String,
  icon_name: String,
  id: Number,
  name: String,
  ranking_weight: Number
})
activitySchema.index({id: 1});

const Activity = mongoose.model('Activity', activitySchema);

Activity.findOne((err, data) => {
  if (!data) {
    ActivityData.forEach(item => {
      Activity.create(item);
    })
  }
})

export default Activity;
