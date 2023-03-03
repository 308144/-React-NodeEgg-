"use strict";

// const auth = require("./middleware/auth");

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, jwt } = app;
  // console.log('jwt',jwt);
  const baseRouter = app.config.baseRouter; //
  router.get("/", controller.home.index);
  // 创建用户信息
  router.post(baseRouter + "/adminCreate", controller.login.adminCreate);
  // 登录
  router.post(baseRouter + "/login", controller.login.adminLogin);
  // 退出登录
  router.post(baseRouter + "/logout", controller.login.adminLogout);

  // 创建就业信息
  router.post(baseRouter + "/createInformation", controller.information.create);
  // 查询学员列表页
  router.post(baseRouter + "/findInformation", controller.information.findAll);
  // 删除
  router.post(
    baseRouter + "/removeInformation",
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
    controller.information.echoOneInformationData
  );

  // 就业统计
  router.get(
    baseRouter + "/employmentStatisticsList/:currencyType",
    controller.statisticsInformation.findAll
  );
  // 就业统计详情
  router.post(
    baseRouter + "/findDetailData",
    controller.statisticsInformation.findDetailData
  );
  // 信息列表页
  // router.post("/information", controller.information);

  // 查询所有用户
  router.post(baseRouter + "/findAllUser", controller.login.findAllUser);
  // 删除用户
  router.get(baseRouter + "/removeOneUser/:id", controller.login.adminRemove);
  // 用户表单回显数据
  router.get(
    baseRouter + "/echoOneUserData/:userName",
    controller.login.echoOneUserData
  );
  // 修改数据用户数据
  router.post(baseRouter + "/updateUser", controller.login.updateUser);

  // 上传文件并解析文件
  router.post(baseRouter + "/uploadExcle", controller.login.uploadExcle);

  // 创建学院
  router.post(baseRouter + "/facultyCreate", controller.faculty.facultyCreate);
  // 查询学院列表
  router.post(
    baseRouter + "/findAllFaculty",
    controller.faculty.findAllFaculty
  );
  // 删除学院
  router.get(
    baseRouter + "/removeOneFaculty/:id",
    controller.faculty.removeOneFaculty
  );
  // 用户表单回显数据
  router.get(
    baseRouter + "/echoOneFacultyData/:id",
    controller.faculty.echoOneFacultyData
  );
  // 修改院系用户数据
  router.post(baseRouter + "/updateFaculty", controller.faculty.updateFaculty);
  // 查询所有学员信息
  router.get(baseRouter + "/getFacultyData", controller.faculty.getFacultyData);

  // 新增教师信息
  router.post(baseRouter + "/teacherCreate", controller.teacher.teacherCreate);
  // 查询教师列表
  router.post(
    baseRouter + "/findAllTeacher",
    controller.teacher.findAllTeacher
  );
  // 删除老师信息
  router.get(
    baseRouter + "/removeOneTeacher/:id",
    controller.teacher.removeOneTeacher
  );
  // 用户表单回显数据
  router.get(
    baseRouter + "/echoOneTeacherData/:id",
    controller.teacher.echoOneTeacherData
  );
  // 修改院系用户数据
  router.post(baseRouter + "/updateTeacher", controller.teacher.updateTeacher);
  // // 查询所有教师信息
  router.get(
    baseRouter + "/selectTeacherDatas/:faculty",
    controller.teacher.selectTeacherDatas
  );
  // 查询教师的手机号
  router.post(
    baseRouter + "/getInformationModalTeacherPhoneData/",
    controller.teacher.getInformationModalTeacherPhoneData
  );

  // 招聘的
  // 创建
  router.post(
    baseRouter + "/recruitmenCreate",
    controller.recruitmen.recruitmenCreate
  );
  // 查询所有
  router.post(
    baseRouter + "/findAllRecruitmen",
    controller.recruitmen.findAllRecruitmen
  );
  //删除
  router.get(
    baseRouter + "/removeOneRecruitmen/:id",
    controller.recruitmen.removeOneRecruitmen
  );
  //删除
  router.get(
    baseRouter + "/echoOneRecruitmenData/:id",
    controller.recruitmen.echoOneRecruitmenData
  );
  //删除
  router.post(
    baseRouter + "/updateRecruitmen",
    controller.recruitmen.updateRecruitmen
  );



  // 宣讲会
  // 创建
  router.post(
    baseRouter + "/recruitmenCampusCreate",
    controller.recruitmenCampus.recruitmenCampusCreate
  );
  // 查询所有
  router.post(
    baseRouter + "/findAllRecruitmenCampus",
    controller.recruitmenCampus.findAllRecruitmenCampus
  );
  //删除
  router.get(
    baseRouter + "/removeOneRecruitmenCampus/:id",
    controller.recruitmenCampus.removeOneRecruitmenCampus
  );
  //删除
  router.get(
    baseRouter + "/echoOneRecruitmenCampusData/:id",
    controller.recruitmenCampus.echoOneRecruitmenCampusData
  );
  //删除
  router.post(
    baseRouter + "/updateRecruitmenCampus",
    controller.recruitmenCampus.updateRecruitmenCampus
  );



};
