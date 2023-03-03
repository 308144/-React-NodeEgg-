var Service = require("egg").Service;
// var helper = require("../extend/helper");
const fs = require("fs");
const xlsx = require("node-xlsx");
const path = require("path");
const jwt = require("jsonwebtoken");
const helper = require("../extend/helper");
class AdminService extends Service {
  // 登录页的查询用户
  async adminLogin(body) {
    const { ctx } = this;
    const oldUser = await ctx.model.Admin.findOne({ userName: body.userName });
    // console.log('ctx11',ctx.app.config.jwt.secret);
    if (!oldUser) {
      return {
        msg: "用户不存在",
        code: 1,
      };
    } else {
      // const isMatch = await ctx.helper.comparePassword(
      //   body.password,
      //   oldUser.password
      // );
      // console.log(body.password, oldUser.password);
      // if (!isMatch) {
      //   return {
      //     msg: "手机号或密码错误",
      //     code: 1,
      //   };
      // }
      // else {
      //  此方法接收两个参数,第一个是要加密保存的数据(一个对象,不要放隐秘性的数据,如密码),第二个是要加密的私钥(一个字符串,越乱越好),第三个是配置项
      let token = jwt.sign(
        { ...oldUser },
        //  ctx.app.config.jwt.secret
        "123",
        {
          expiresIn: "48h",
        }
      );
      ctx.cookies.set("token", token, {
        maxAge: 86400000,
        httpOnly: false,
      });
      return {
        data: {
          identity: oldUser.identity,
          userId: 1,
          token: token,
          userName: oldUser.userName,
        },
        msg: "登录成功",
        code: 0,
      };
      // }
    }
  }
  // 登录页的查询用户
  async middlewareFindOne(body) {
    const { ctx } = this;
    const oldUser = await ctx.model.Admin.findOne({ userName: body.userName });
    return oldUser;
  }

  // 退出登录
  async adminLogout() {
    const { ctx } = this;
    ctx.cookies.set("token", "", {
      maxAge: 0,
    });
    return {
      message: "退出成功",
      code: 0,
    };
  }
  // 删除
  // { n: 1, ok: 1, deletedCount: 1 }返回的res
  async adminRemove(data) {
    const { ctx } = this;
    // console.log('data',data);
    // console.log('userName',userName);
    const res = await ctx.model.Admin.deleteOne({ userName: data });
    console.log("res", res);
    if (res.ok === 1) {
      return {
        message: "删除成功",
        code: 0,
        success: true,
      };
    }
  }
  // 查询所有用户
  async findAllUser(params) {
    const { ctx } = this;
    console.log("params", params);
    const { current, pageSize } = params;
    delete params.current;
    delete params.pageSize;
    const findAllUser = await ctx.model.Admin.find({
      ...params,
    })
      .skip((current - 1) * pageSize)
      .limit(pageSize);
    const total = await ctx.model.Admin.find({
      ...params,
    }).count();
    // const res = await ctx.model.Admin.deleteOne({ _id: id });
    console.log("findAllUser，total", findAllUser, total);
    if (findAllUser) {
      return {
        msg: "查询用户成功",
        code: 0,
        data: {
          current,
          pageSize,
          total,
          records: [...findAllUser],
        },
      };
    }
  }

  // 创建数据
  async adminCreate(body) {
    const { ctx } = this;
    // return ctx.helper.genSaltPassword(body.password).then(async (hash) => {
    //   body.password = hash;
    const oldUser = await ctx.model.Admin.find({ userName: body.userName });
    if (oldUser.length) {
      console.log("已经存在");
      return {
        code: 1,
        data: null,
        msg: "账号已经存在",
      };
    } else {
      const adminCreateres = await ctx.model.Admin.create(body);
      console.log("adminCreateres", adminCreateres);
      return {
        code: 0,
        data: null,
        msg: "创建用户成功",
      };
    }
    // });
  }
  // 回显数据
  async echoOneUserData(userName) {
    console.log("userName", userName);
    const { ctx } = this;
    const records = await ctx.model.Admin.find({ userName: userName });
    console.log("records", records);
    if (records.length) {
      return {
        code: 0,
        data: records,
        msg: "查询成功",
      };
    } else {
      return {
        code: 1,
        data: null,
        msg: "查询失败",
      };
    }
  }
  // 批量上传的用户
  async uploadExcle(params) {
    const { ctx } = this;
    console.log("data", params);

    const checkTelephone = (telephone) => {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(telephone)) {
        return false;
      } else {
        return true;
      }
    };
    const workSheetsFromBuffer = xlsx
      .parse(params[0].filepath)[0]
      .data.splice(8);
    console.log("workSheetsFromBuffer", workSheetsFromBuffer);
const identityArray=['manager','student']
    if (workSheetsFromBuffer) {
      for (var i = 0; i < workSheetsFromBuffer.length; i++) {
        if (checkTelephone(workSheetsFromBuffer[i][0])) {
       const res=   await ctx.model.Admin.find({userName:workSheetsFromBuffer[i][0]})
       console.log('res',res);
          if(res.length){
            return {
              code: 1,
              data: null,
              msg: `第${9 + i}行的userName重复，请移除`,
            }
          }else{
            if(identityArray.includes(workSheetsFromBuffer[i][2])){
              await ctx.model.Admin.create({userName:workSheetsFromBuffer[i][0],password:workSheetsFromBuffer[i][1],identity:workSheetsFromBuffer[i][2],})
          }else{
            return {
              code: 1,
              data: null,
              msg: `第${9 + i}行的identity不符合manager或student其一，请移除`,
            }
          }
          }
          
        } else {
          return {
            code: 1,
            data: null,
            msg: `第${9 + i}行的userName不符合手机号要求，请移除`,
          };
        }
        return {
          code: 0,
          data: null,
          msg: "批量上传用户成功"
        }
      }
    } else {
      return {
        code: 1,
        data: 0,
        msg: "请勿提交空文件或将源文件直接提交",
      };
    }

    // fs.writeFileSync('./aa.text', params)
    // var f = fs.createReadStream(data);
    // ctx.response.set({
    //   "Content-Type": "application/octet-stream", // 告诉浏览器这是一个二进制文件
    //   "Content-Disposition": "attachment; filename=" + " 批量模板.xlsx", // 告诉浏览器这是一个需要下载的文件
    // });
    // f.pipe(response);
    // return {
    //   code: 0,
    //   data: [f],
    //   msg: "下载成功",
    // };
    // console.log("records", records);
    // if (records.length) {
    //   return {
    //     code: 0,
    //     data: records,
    //     msg: "查询成功",
    //   };
    // } else {
    //   return {
    //     code: 1,
    //     data: null,
    //     msg: "查询失败",
    //   };
    // }
  }

  // 修改用户
  async updateUser(params) {
    // console.log('params',params);
    const { ctx } = this;
    const records = await ctx.model.Admin.updateOne(
      { userName: params.userName },
      { $set: { ...params } }
    );
    console.log("records", records);
    if (records.ok === 1) {
      return {
        code: 0,
        data: null,
        msg: "修改成功",
      };
    } else {
      return {
        code: 1,
        data: null,
        msg: "修改失败",
      };
    }
  }
}

module.exports = AdminService;






