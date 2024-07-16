import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user_id: Number,
  username: String,
  password: String,
});

const UserModel = mongoose.model('User', schema);

export default UserModel;
