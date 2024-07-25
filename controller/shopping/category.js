import BaseComponent from "../../prototype/baseComponent";
import CategoryModel from '../../models/shopping/category';

class Category extends BaseComponent {
  constructor() {
    super();
  }
  async getCategories(req,res){
    try{
      const categories = await CategoryModel.find({});
      res.send(categories);
    }catch (e) {
      console.log('获取categories失败');
      res.send({
        status: 0,
        type: 'ERROR_DATA',
        message: '获取categories失败'
      })
    }
  }
}

export default new Category();
