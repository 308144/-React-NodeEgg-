"use strict";

// const auth = require("./middleware/auth");

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller ,jwt} = app;
  // console.log('jwt',jwt);
  const baseRouter = app.config.baseRouter; //
  router.get("/", controller.home.index);
  // 创建用户信息
  router.post(baseRouter + "/adminCreate", controller.login.adminCreate);
  // 登录
  router.post(baseRouter + "/login", controller.login.adminLogin);
  // 退出登录
  router.post(baseRouter + "/logout", controller.login.adminLogout);
  // 删除
  router.get(baseRouter + "/reomve/:id", controller.login.adminRemove);




  // 创建就业信息
  router.post(baseRouter + "/createInformation", controller.information.create);
  // 查询学员列表页
  router.post(baseRouter + "/findInformation", controller.information.findAll);
  // 删除
  router.get(
    baseRouter + "/removeInformation/:phone",
    controller.information.removeOneInformation
  );
  // 修改
  router.post(
    baseRouter + "/updateOneInformation",
    controller.information.updateOneInformation
  );
  // 获取表单回显数据
  router.get(
    baseRouter + "/echoOneInformationData/:phone",
    // jwt,
    controller.information.echoOneInformationData
  );



    // 就业统计
    router.get(baseRouter+'/employmentStatisticsList/:specialized',controller.statisticsInformation.findAll)



    
  // 信息列表页
  // router.post("/information", controller.information);
};
