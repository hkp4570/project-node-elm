import AddressComponent from "../../prototype/addressComponent";
import AddressModel from '../../models/v1/address';

class AddressHandler extends AddressComponent{
  constructor() {
    super();
  }
  async getAddress(req,res,next){
    const { user_id } = req.params;
    if(!user_id || !Number(+user_id)){
      res.send({
        type: 'ERROR_USER_ID',
        message: 'user_id参数错误',
      })
      return
    }
    try{
      const addressList = await AddressModel.find({user_id}, '-_id');
      res.send(addressList);
    }catch (err) {
      console.log('获取收获地址失败', err);
      res.send({
        type: 'ERROR_GET_ADDRESS',
        message: '获取地址列表失败'
      })
    }
  }
}

export default new AddressHandler();
