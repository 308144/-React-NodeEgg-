const bcrypt = require("bcrypt");

module.exports = {
  // 加密
  genSaltPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (!err) {
            resolve(hash);
          } else {
            reject(err);
          }
        });
      });
    });
  },
  //解密
  comparePassword(_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) {
          resolve(isMatch);
        } else {
          reject("err---------------", err);
        }
      });
    });
  },
//  成功方法回调
  success({ ctx, res = null }) {
    ctx.status = res.status ? res.status : 200;
    if (res.status) {
      delete res.status;
    }
    // console.log(res);
    // console.log(res.code);
    ctx.body = {
      data: res.data ? res.data : '走的help的data',
      code: res.code ? res.code : 0,
      msg: res.msg ? res.msg : "走的help的msg",
    };
  },
};

//   /**
//    * @params  {未加密的密码}  _password
//    * @params  {数据库保存的已加密的密码}  password
//    *
//    * /
