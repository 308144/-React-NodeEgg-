/* eslint valid-jsdoc: "off" */

"use strict";
const userConfig = require("./config.user");
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1672280709716_6857";

  // add your middleware config here
  config.middleware = ['cros'];

  // 处理post请求的csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*']
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  config.view = {
    defaultViewEngine: "nunjucks",
    mapping: {
      ".tpi": "nunjucks",
    },
  };
  config.mongoose = {
    client: {
      url: "mongodb://127.0.0.1/employmentManagement", //你的数据库地址，不要端口
      options: {
        useNewUrlParser: true,
      },
    },
  };
  config.jwt = {
    secret: '123',
  };
  config.auth = {
whiteList:userConfig.userName  };
  return {
    ...config,
    ...userConfig, //处理请求路径步骤！导出一个对象，名字叫userConfig,直接在文件中引入即可，    baseRouter:'/nodeServe'就可全局使用
  };
};
