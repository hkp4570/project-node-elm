import RatingModel from '../../models/ugc/rating';

class Rating {
  constructor() {
    this.type = ['ratings', 'scores', 'tags'];
    this.getRatings = this.getRatings.bind(this);
    this.getScores = this.getScores.bind(this);
    this.getTags = this.getTags.bind(this);
  }
  // 评价
  async getRatings(req, res) {
    const restaurant_id = req.params.restaurant_id;
    if (!restaurant_id || !Number(restaurant_id)) {
      res.send({
        status: 0,
        type: 'ERROR_PARAMS',
        message: '餐馆ID参数错误'
      })
      return
    }
    try {
      const rating = await RatingModel.getData(restaurant_id, this.type[0]);
      res.send(rating);
    } catch (err) {
      console.log('获取评论列表失败', err);
      res.send({
        status: 0,
        type: "ERROR_DATA",
        message: '未找到当前餐馆的评论数据'
      })
    }
  }

  // 评分
  async getScores(req, res) {
    const restaurant_id = req.params.restaurant_id;
    if (!restaurant_id || !Number(restaurant_id)) {
      res.send({
        status: 0,
        type: 'ERROR_PARAMS',
        message: '餐馆ID参数错误'
      })
      return
    }
    try {
      const scores = await RatingModel.getData(restaurant_id, this.type[1]);
      res.send(scores);
    } catch (err) {
      console.log('获取评论列表失败', err);
      res.send({
        status: 0,
        type: "ERROR_DATA",
        message: '未找到当前餐馆的评论数据'
      })
    }
  }
  // 标签
  async getTags(req,res){
    const restaurant_id = req.params.restaurant_id;
    if (!restaurant_id || !Number(restaurant_id)) {
      res.send({
        status: 0,
        type: 'ERROR_PARAMS',
        message: '餐馆ID参数错误'
      })
      return
    }
    try{
      const tags = await RatingModel.getData(restaurant_id,this.type[2]);
      res.send(tags);
    }catch (err) {
      console.log('获取评论列表失败', err);
      res.send({
        status: 0,
        type: "ERROR_DATA",
        message: '未找到当前餐馆的评论数据'
      })
    }
  }
}

export default new Rating();
