
class CityHandle {
  constructor() {
    this.getCity = this.getCity.bind(this);
  };
  async getCity(req,res,next){
    const type = req.query.type;
    let cityinfo;
    try{
      switch (type){
        case 'guess':
      }
    }catch (error){

    }
    console.log(this);
  }
}
export default new CityHandle();
