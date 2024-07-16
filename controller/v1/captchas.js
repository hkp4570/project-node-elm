const svgCaptcha = require('svg-captcha');

class Captchas{
  constructor() {
  }
  async getCaptchas(req, res) {
    const captcha = svgCaptcha.create({
      width: 120
    });
    res.cookie('cap', captcha.text, { maxAge: 300000, httpOnly: true });
    res.status(200).send({status:1,code:captcha.data});
  }
}

export default new Captchas();
