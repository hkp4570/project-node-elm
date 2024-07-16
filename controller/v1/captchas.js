const svgCaptcha = require('svg-captcha');

class Captchas{
  constructor() {
  }
  async getCaptchas(req, res) {
    const captcha = svgCaptcha.create({
      width: 120
    });
    req.session.captcha = captcha.text;
    res.status(200).send({status:1,code:captcha.data});
  }
}

export default new Captchas();
